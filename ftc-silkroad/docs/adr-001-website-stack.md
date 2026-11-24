# ADR-001: Build the website as a static site that reads Supabase directly

**Status:** Accepted
**Date:** 2026-11-24
**Deciders:** FIRST SilkRoad maintainers

## Context

The project brief (FTC KZ Parts Exchange, Nov 24, 2026) splits the system into three parts. The Telegram bot is the only way to post. The website is the only place to browse. Deals happen in Telegram private chats. The bot and the website share one Supabase database.

The website's job is narrow:

- show every active listing as a card, with search and filters by part, category, city, listing type and team
- link the uploader's Telegram username
- need no login

Constraints:

- **Scale.** Kazakhstan has a few dozen FTC teams. Even at full adoption we expect hundreds of active listings, not tens of thousands.
- **Maintainers.** Students who rotate every season. Whatever we pick has to be easy for next year's team to pick up.
- **Budget.** Free tiers only.
- **Time.** The MVP has to ship in three weeks.
- **Supply chain.** Our dependency policy routes every npm install through a package firewall. Fewer dependencies means less to vet and less to break each season.

The brief suggests Next.js, or React with Vite.

## Decision

Build the website as plain HTML, CSS and JavaScript modules with no build step and no npm dependencies. The browser reads a single Supabase view, `public_listings`, through the REST API using the public anon key. Search and filters run in the browser over the loaded listings. Filter state lives in the URL, so a search can be shared as a link.

## Options considered

### Option A: Static site, no dependencies (chosen)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low. Seven small JS modules, one stylesheet, two pages. |
| Cost | Free on GitHub Pages, Netlify or Vercel. |
| Scalability | Fine up to a few thousand listings loaded in one request (see Revisit). |
| Team familiarity | High. Anyone who knows HTML and JS can read it. |

**Pros:**
- Nothing to install, upgrade or patch.
- Any static host works.
- Pages load fast on phones because there's no framework bundle.

**Cons:**
- No server rendering, so search engines see an empty list. We don't need that, because teams arrive from the Telegram channel.
- We maintain our own small DOM helper.

### Option B: Next.js

| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium. Routing, server/client components, build pipeline. |
| Cost | Free on Vercel. |
| Scalability | High. Server-side filtering and pagination are easy to add. |
| Team familiarity | Medium. Students need React and Next concepts first. |

**Pros:**
- Server rendering for SEO and link previews per listing.
- Easy to add server-side search later.

**Cons:**
- Hundreds of transitive dependencies to vet and keep patched every season.
- Framework upgrades break things between seasons.
- It solves problems we don't have at this scale.

### Option C: React + Vite single-page app

| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium. Build step, component model. |
| Cost | Free. |
| Scalability | Same as A. It also filters in the browser. |
| Team familiarity | Medium. |

**Pros:**
- Component structure helps if the UI grows a lot.

**Cons:**
- Same supply-chain cost as B with none of the server-side benefits.

## Trade-off analysis

The deciding factor is who maintains this. A rotating group of students has to keep it running for years. With A, next season's team opens `index.html` and sees everything. B and C add a toolchain, which gives us server rendering and a component model. At our scale neither changes what a user sees.

Security comes out about even. All three options read through the same anon key. The real access control is in the database: Row Level Security, column grants, and one security-invoker view. That is the same whichever frontend we pick.

## Consequences

- **Easier:** hosting anywhere, onboarding new maintainers, auditing what the site does.
- **Harder:** per-listing link previews in Telegram, which need server rendering. Listing deep links (`?listing=<id>`) still work, but the preview shows the site title, not the part.
- **Data boundary:** the website never writes. Only the bot writes, using the service-role key on its server. The anon key can read active listings, team names and numbers, and the parts catalog. Telegram user IDs, coach contacts and `created_by` are not granted to it.

## Revisit when

- There are more than about 2,000 active listings, or the first load passes about 300 KB. Then move filtering into Postgres (query parameters on the view, or an RPC) and paginate.
- We want rich Telegram previews per listing. That needs a small server-rendered route, which is when Next.js starts earning its cost.
- The Kazakh and Russian translations (v1.2) outgrow the strings in `format.js` and the HTML.

## Action items

1. [x] Website: listings page, parts catalog page, detail dialog, URL-synced filters.
2. [x] `supabase/schema.sql` with RLS, column grants and the `public_listings` view.
3. [x] Parts catalog JSON and `scripts/catalog-to-sql.mjs` so the bot and the site share part ids.
4. [ ] Create the Supabase project, run the schema and seed, and put the URL and anon key in `site/js/config.js`.
5. [ ] Build the bot (separate repo or folder). It writes `listings` with the service-role key.
6. [ ] Deploy `site/` to a static host and post the link in the FIRST parts channel, after the channel admins agree.
