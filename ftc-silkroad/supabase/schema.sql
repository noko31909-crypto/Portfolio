-- FIRST SilkRoad database schema (Supabase / PostgreSQL 15+).
--
-- Who can do what:
--   * The Telegram bot writes with the service-role key (server-side only). It bypasses RLS.
--   * The website reads with the public anon key. It can read active listings, team
--     names and the parts catalog, and nothing else.
-- Private columns (Telegram user IDs, coach contacts, who created a listing) are kept
-- out of reach with column-level grants, which the security_invoker view respects.
--
-- Run in the Supabase SQL editor, then run seed-parts.sql.

create extension if not exists pgcrypto;

create type program as enum ('FTC', 'FLL');
create type listing_type as enum ('trade', 'sell', 'wanted', 'giveaway');
create type listing_condition as enum ('new', 'like_new', 'used', 'for_parts');
create type listing_status as enum ('active', 'closed', 'hidden');
create type deal_outcome as enum ('traded', 'sold', 'given');
create type report_status as enum ('open', 'resolved', 'dismissed');

-- Telegram usernames: 5–32 chars, letters, digits and underscore, starting with a letter.
create domain tg_username as text
  check (value ~ '^[A-Za-z][A-Za-z0-9_]{4,31}$');

create table teams (
  id            bigint generated always as identity primary key,
  program       program not null default 'FTC',
  number        integer not null check (number > 0),
  name          text not null check (char_length(name) between 1 and 60),
  city          text not null check (char_length(city) between 1 and 40),
  verified      boolean not null default false,
  coach_contact text check (char_length(coach_contact) <= 100),   -- private
  created_at    timestamptz not null default now(),
  unique (program, number)
);

create table users (
  telegram_id       bigint primary key,                            -- private
  telegram_username tg_username,
  team_id           bigint references teams (id) on delete set null,
  role              text not null default 'member' check (role in ('member', 'admin')),
  created_at        timestamptz not null default now()
);

-- Standard part names. Filled from site/data/parts-catalog.json by scripts/catalog-to-sql.mjs.
create table parts (
  id                text primary key,
  brand             text not null,
  name              text not null,
  sku               text,
  category          text not null,
  aliases           text[] not null default '{}',
  url               text,
  image             text,   -- the maker's product photo, loaded from the maker's site
  typical_price_kzt integer check (typical_price_kzt >= 0)
);
create index parts_brand_category on parts (brand, category);

create table listings (
  id             uuid primary key default gen_random_uuid(),
  team_id        bigint not null references teams (id),
  created_by     bigint not null references users (telegram_id),  -- private
  type           listing_type not null,
  have_part_id   text references parts (id),
  have_text      text check (char_length(have_text) <= 200),
  want_part_id   text references parts (id),
  want_text      text check (char_length(want_text) <= 200),
  want_price_kzt integer check (want_price_kzt between 0 and 10000000),
  category       text,   -- for free-text parts; catalog parts carry their own
  condition      listing_condition,
  notes          text check (char_length(notes) <= 500),
  -- Copied from the team and user at posting time, as the project brief specifies,
  -- so the listing shows who to contact even if the user later leaves the team.
  city           text not null check (char_length(city) between 1 and 40),
  tg_username    tg_username not null,
  photos         text[] not null default '{}' check (cardinality(photos) <= 6),
  status         listing_status not null default 'active',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  closed_at      timestamptz,
  -- A listing must offer or ask for something.
  constraint listing_has_content check (
    have_part_id is not null or have_text is not null
    or want_part_id is not null or want_text is not null or want_price_kzt is not null
  ),
  -- Giveaways ask for nothing.
  constraint giveaway_asks_nothing check (
    type <> 'giveaway' or (want_part_id is null and want_text is null and want_price_kzt is null)
  ),
  -- "Wanted" listings name what they're looking for.
  constraint wanted_names_part check (
    type <> 'wanted' or want_part_id is not null or want_text is not null
  ),
  constraint closed_at_matches_status check ((status = 'closed') = (closed_at is not null))
);
create index listings_active_recent on listings (created_at desc) where status = 'active';
create index listings_team on listings (team_id);

create table subscriptions (
  id         bigint generated always as identity primary key,
  user_id    bigint not null references users (telegram_id) on delete cascade,
  part_id    text references parts (id),
  category   text,
  city       text,
  created_at timestamptz not null default now(),
  check (part_id is not null or category is not null)
);

create table deals (
  id          bigint generated always as identity primary key,
  listing_id  uuid not null references listings (id),
  buyer_team  bigint references teams (id),
  seller_team bigint not null references teams (id),
  outcome     deal_outcome not null,
  closed_at   timestamptz not null default now(),
  unique (listing_id)   -- one recorded deal per listing
);

create table reports (
  id          bigint generated always as identity primary key,
  listing_id  uuid not null references listings (id) on delete cascade,
  reporter    text check (char_length(reporter) <= 100),
  reason      text not null check (char_length(reason) between 1 and 500),
  status      report_status not null default 'open',
  created_at  timestamptz not null default now()
);

create function touch_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end $$;
create trigger listings_touch before update on listings
  for each row execute function touch_updated_at();

-- ---- Access for the website (anon key) --------------------------------------

alter table teams         enable row level security;
alter table users         enable row level security;
alter table parts         enable row level security;
alter table listings      enable row level security;
alter table subscriptions enable row level security;
alter table deals         enable row level security;
alter table reports       enable row level security;

-- Supabase grants every new table to anon/authenticated by default. Take that back,
-- then grant only the public columns.
revoke all on teams, users, parts, listings, subscriptions, deals, reports from anon, authenticated;

grant select (id, program, number, name, city, verified) on teams to anon, authenticated;
grant select on parts to anon, authenticated;
grant select (id, team_id, type, have_part_id, have_text, want_part_id, want_text, want_price_kzt,
              category, condition, notes, city, tg_username, photos, status, created_at)
  on listings to anon, authenticated;

create policy "teams are public" on teams for select to anon, authenticated using (true);
create policy "parts are public" on parts for select to anon, authenticated using (true);
create policy "active listings are public" on listings for select to anon, authenticated
  using (status = 'active');
-- users, subscriptions, deals and reports have no policies: only the bot can touch them.

-- The one thing the website reads. security_invoker makes the view run with the
-- caller's rights, so the RLS policy and column grants above still apply.
create view public_listings with (security_invoker = true) as
  select l.id, l.type, l.have_part_id, l.have_text, l.want_part_id, l.want_text, l.want_price_kzt,
         l.category, l.condition, l.notes, l.city, l.tg_username, l.photos, l.created_at,
         t.number as team_number, t.name as team_name
    from listings l
    join teams t on t.id = l.team_id
   where l.status = 'active';

grant select on public_listings to anon, authenticated;

-- ---- Photo storage ------------------------------------------------------------
-- Public-read bucket; only the bot (service role) uploads. The website only shows
-- photo URLs under this project's /storage/v1/object/public/ path.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('listing-photos', 'listing-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
