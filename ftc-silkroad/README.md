# SilkRoad Exchange

The website for SilkRoad Exchange, a spare-parts exchange for FTC teams in Kazakhstan. Teams post parts through a Telegram bot. This site lists them with search and filters, and links each listing to the team's Telegram so the deal happens in a private chat. The site doesn't handle money or delivery.

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

The database belongs to the Telegram bot, [Quantelteam/SilkRoad](https://github.com/Quantelteam/SilkRoad) ([@ftc_silkroad_bot](https://t.me/ftc_silkroad_bot)). The bot writes listings; the site reads the bot's `listings_public` view and shows only rows with `status = active`. `normalizeBotRow()` in `site/js/data.js` translates the bot's fields (types, conditions, categories) to the site's.

1. In `site/js/config.js`, `supabaseUrl` and `botUsername` are already set. Paste the project's anon (publishable) key into `supabaseAnonKey`: Supabase → Project Settings → API.
2. Reload the page. The example-listings note disappears and the bot's listings show.

The anon key is meant to be public: the bot's Row Level Security lets it read only `listings_public` and `parts`. The service-role key belongs to the bot's server and must never go in this folder.

`supabase/schema.sql` and `seed-parts.sql` here are the site's first design, kept for reference. They are not used; the bot's schema is the real one.

## Intro video

The listings page has a slot for a 30-second vertical intro (1080×1920). It stays hidden until `site/assets/intro.mp4` exists. To add it, open the SilkRoad Exchange intro film on claude.ai, use Export to save an MP4, and save it as `site/assets/intro.mp4`. Keep it small (a few MB) because it loads on the home page. On wide screens it plays muted in the header; on phones a "Watch the 30-second intro" button opens it.

## Deploy

`site/` is plain static files, so any static host works. On Vercel or Netlify, set the root directory to `ftc-silkroad/site` with no build command. `site/vercel.json` sets the security headers on Vercel. On other hosts, copy the same headers from it.

## Notes from the site's first design

These described a schema the bot didn't end up using. The bot's own README is current. The original notes:

- Take `have_part_id` and `want_part_id` from `parts.id` (the same ids as the catalog JSON). For anything not in the catalog, use `have_text` or `want_text` and set `category`.
- Copy `city` from the team and `tg_username` from the user at posting time.
- Upload photos to the `listing-photos` bucket and store their public URLs. The site ignores photo URLs from any other host.
- To close a listing, set `status = 'closed'` and `closed_at = now()`. It disappears from the site on the next page load.

## Parts catalog

`site/data/parts-catalog.json` lists common FTC parts from goBILDA, REV Robotics, Studica and others, grouped by brand and category. Part numbers were checked against the vendors' sites when the catalog was built. A part without a confirmed number has `sku: null`, which is better than a guessed one. To add a part, add an entry with a new unique `id`, then regenerate the seed.
