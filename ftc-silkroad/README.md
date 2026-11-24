# FIRST SilkRoad

The website for FIRST SilkRoad, a spare-parts exchange for FTC teams in Kazakhstan. Teams post parts through a Telegram bot. This site lists them with search and filters, and links each listing to the team's Telegram so the deal happens in a private chat. The site doesn't handle money or delivery.

This folder holds the website, the database schema and the parts catalog. The bot isn't built yet.

## Run it locally

```bash
npm run serve
```

Then open http://localhost:8080. You need Python 3, nothing else. With no database configured, the site shows the example listings from `site/data/demo-listings.json` and says so at the top of the page.

```bash
npm test
```

The tests use Node's built-in runner (Node 22 or newer) and have no dependencies.

## Layout

| Path | What it is |
| --- | --- |
| `site/index.html` | Listings: search, filters, cards, detail dialog |
| `site/catalog.html` | Parts catalog grouped by brand and category, with listing counts |
| `site/js/data.js` | Loads listings from Supabase (or the examples) and validates every row |
| `site/js/filter.js` | Search, filters, sorting and URL state. Pure functions, unit-tested |
| `site/js/format.js` | All interface wording for listings, in one place for translation |
| `site/data/parts-catalog.json` | Standard part names and numbers, the source of truth for part ids |
| `supabase/schema.sql` | Tables, Row Level Security, column grants and the `public_listings` view |
| `scripts/catalog-to-sql.mjs` | Turns the catalog JSON into `supabase/seed-parts.sql` |
| `docs/adr-001-website-stack.md` | Why this is a static site and not Next.js |

## Connect the database

1. Create a Supabase project (the free tier is enough).
2. In the SQL editor, run `supabase/schema.sql`, then `supabase/seed-parts.sql`. To regenerate the seed after editing the catalog, run `npm run catalog:sql`.
3. In `site/js/config.js`, set `supabaseUrl`, `supabaseAnonKey` and `botUsername`.

The anon key is meant to be public. The schema only lets it read active listings, team names and numbers, and the parts catalog. The service-role key belongs to the bot's server and must never go in this folder.

## Intro video

The listings page has a slot for a 30-second vertical intro (1080×1920). It stays hidden until `site/assets/intro.mp4` exists. To add it, open the FIRST SilkRoad intro film on claude.ai, use Export to save an MP4, and save it as `site/assets/intro.mp4`. Keep it small (a few MB) because it loads on the home page. On wide screens it plays muted in the header; on phones a "Watch the 30-second intro" button opens it.

## Deploy

`site/` is plain static files, so any static host works. On Vercel or Netlify, set the root directory to `ftc-silkroad/site` with no build command. `site/vercel.json` sets the security headers on Vercel. On other hosts, copy the same headers from it.

## For the bot

The bot writes to `listings` with the service-role key. For each listing:

- Take `have_part_id` and `want_part_id` from `parts.id` (the same ids as the catalog JSON). For anything not in the catalog, use `have_text` or `want_text` and set `category`.
- Copy `city` from the team and `tg_username` from the user at posting time.
- Upload photos to the `listing-photos` bucket and store their public URLs. The site ignores photo URLs from any other host.
- To close a listing, set `status = 'closed'` and `closed_at = now()`. It disappears from the site on the next page load.

## Parts catalog

`site/data/parts-catalog.json` lists common FTC parts from goBILDA, REV Robotics, Studica and others, grouped by brand and category. Part numbers were checked against the vendors' sites when the catalog was built. A part without a confirmed number has `sku: null`, which is better than a guessed one. To add a part, add an entry with a new unique `id`, then regenerate the seed.
