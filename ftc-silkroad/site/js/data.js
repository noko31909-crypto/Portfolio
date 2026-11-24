// Loading and validating listings and the parts catalog.
// Every row from the database is treated as untrusted: it is checked against the
// expected shape here, and anything that fails is dropped, never rendered.

export const LISTING_TYPES = ['trade', 'sell', 'wanted', 'giveaway'];
export const CONDITIONS = ['new', 'like_new', 'used', 'for_parts'];

const USERNAME_RE = /^[A-Za-z][A-Za-z0-9_]{4,31}$/;
const MAX_TEXT = 200;
const MAX_PRICE_KZT = 10_000_000;
const MAX_PHOTOS = 6;
// One request loads every active listing; see docs/adr-001 for when to paginate instead.
const MAX_LISTINGS = 2000;

/** @param {unknown} value */
function cleanText(value, max = MAX_TEXT) {
  if (typeof value !== 'string') return null;
  const text = value.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  return text ? text.slice(0, max) : null;
}

/** Telegram usernames: 5–32 chars, letters, digits, underscore, starting with a letter. */
export function safeUsername(value) {
  if (typeof value !== 'string') return null;
  const name = value.trim().replace(/^@/, '');
  return USERNAME_RE.test(name) ? name : null;
}

// Hosts allowed to serve official catalog photos (the vendors' own image CDNs).
// Keep in sync with img-src in the Content-Security-Policy (HTML meta and vercel.json).
export const PART_IMAGE_HOSTS = [
  'cdn11.bigcommerce.com', // goBILDA and REV Robotics stores
  'andymark.com',
  'www.pitsco.com', // TETRIX
  'limelightvision.io',
  'resource.logitech.com',
  'resource.logitechg.com',
  'gmedia.playstation.com',
];

// Self-hosted copies live in site/photos/. Use them only for makers who gave written
// permission (see reports/ for why hotlinking is the default).
const LOCAL_PHOTO_RE = /^photos\/[a-z0-9-]+\.(?:jpg|png|webp)$/;

/** A catalog photo URL: https from an allowed vendor host, or a file in photos/. */
export function safePartImage(value) {
  if (typeof value !== 'string') return null;
  if (LOCAL_PHOTO_RE.test(value)) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && PART_IMAGE_HOSTS.includes(url.hostname) ? url.href : null;
  } catch {
    return null;
  }
}

/** Any https URL (vendor product pages), or null. */
export function safeHttpsUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

/** Contact link for a validated username, or null. */
export function telegramLink(username) {
  const name = safeUsername(username);
  return name ? `https://t.me/${encodeURIComponent(name)}` : null;
}

/**
 * Photos are only shown when they come from this project's own Supabase storage
 * bucket, so a listing can't point the page at an arbitrary host.
 */
export function safePhotoUrl(value, supabaseUrl) {
  if (typeof value !== 'string' || !supabaseUrl) return null;
  try {
    const url = new URL(value);
    const base = new URL(supabaseUrl);
    if (url.protocol !== 'https:' || url.origin !== base.origin) return null;
    if (!url.pathname.startsWith('/storage/v1/object/public/')) return null;
    return url.href;
  } catch {
    // Not a parseable URL: treat it like any other disallowed photo.
    return null;
  }
}

function cleanPrice(value) {
  const price = typeof value === 'string' ? Number(value) : value;
  if (typeof price !== 'number' || !Number.isFinite(price) || price < 0 || price > MAX_PRICE_KZT) return null;
  return Math.round(price);
}

function cleanDate(value) {
  if (typeof value !== 'string') return null;
  const t = Date.parse(value);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

/**
 * Turns one row of the public_listings view (or a demo listing, same shape) into the
 * listing object the page uses. Returns null for rows that fail validation.
 *
 * @param {Record<string, unknown>} row
 * @param {{ partsById: Map<string, Part>, supabaseUrl?: string }} ctx
 * @returns {Listing | null}
 */
export function normalizeListing(row, ctx) {
  if (!row || typeof row !== 'object') return null;
  const id = typeof row.id === 'string' || typeof row.id === 'number' ? String(row.id) : null;
  const type = LISTING_TYPES.includes(/** @type {string} */ (row.type)) ? /** @type {ListingType} */ (row.type) : null;
  const createdAt = cleanDate(row.created_at);
  const teamName = cleanText(row.team_name, 60);
  const city = cleanText(row.city, 40);
  if (!id || !type || !createdAt || !teamName || !city) return null;

  const havePart = ctx.partsById.get(/** @type {string} */ (row.have_part_id)) ?? null;
  const wantPart = ctx.partsById.get(/** @type {string} */ (row.want_part_id)) ?? null;
  const haveText = cleanText(row.have_text);
  const wantText = cleanText(row.want_text);
  const wantPrice = cleanPrice(row.want_price_kzt);

  const have = havePart || haveText ? { part: havePart, text: haveText } : null;
  const want = wantPart || wantText || wantPrice !== null ? { part: wantPart, text: wantText, priceKzt: wantPrice } : null;
  // A listing has to offer or ask for something to be worth showing.
  if (!have && !want) return null;

  const teamNumber = Number.isInteger(row.team_number) && /** @type {number} */ (row.team_number) > 0 ? /** @type {number} */ (row.team_number) : null;
  const category = havePart?.category ?? wantPart?.category ?? cleanText(row.category, 30);
  const condition = CONDITIONS.includes(/** @type {string} */ (row.condition)) ? /** @type {Condition} */ (row.condition) : null;
  const photos = Array.isArray(row.photos)
    ? row.photos.map((p) => safePhotoUrl(p, ctx.supabaseUrl)).filter(Boolean).slice(0, MAX_PHOTOS)
    : [];

  return {
    id,
    type,
    have,
    want,
    condition,
    category,
    notes: cleanText(row.notes, 500),
    city,
    team: { number: teamNumber, name: teamName },
    username: safeUsername(row.tg_username),
    photos: /** @type {string[]} */ (photos),
    createdAt,
  };
}

/** @returns {Promise<Catalog>} */
export async function loadCatalog() {
  const res = await fetch('data/parts-catalog.json');
  if (!res.ok) throw new Error(`Parts catalog: HTTP ${res.status}`);
  const raw = await res.json();
  return normalizeCatalog(raw);
}

/** @returns {Catalog} */
export function normalizeCatalog(raw) {
  const categories = Array.isArray(raw?.categories)
    ? raw.categories.filter((c) => typeof c?.id === 'string' && typeof c?.name === 'string')
    : [];
  const brands = Array.isArray(raw?.brands) ? raw.brands.filter((b) => typeof b === 'string') : [];
  const parts = Array.isArray(raw?.parts)
    ? raw.parts
        .filter((p) => typeof p?.id === 'string' && typeof p?.name === 'string' && typeof p?.brand === 'string')
        .map((p) => ({
          id: p.id,
          name: p.name,
          brand: p.brand,
          sku: typeof p.sku === 'string' ? p.sku : null,
          category: typeof p.category === 'string' ? p.category : 'other',
          aliases: Array.isArray(p.aliases) ? p.aliases.filter((a) => typeof a === 'string') : [],
          image: safePartImage(p.image),
          url: safeHttpsUrl(p.url),
        }))
    : [];
  return { brands, categories, parts, partsById: new Map(parts.map((p) => [p.id, p])) };
}

/**
 * Loads active listings from Supabase, or the bundled examples when the site has
 * no database configured yet.
 *
 * @param {Catalog} catalog
 * @param {{ supabaseUrl: string, supabaseAnonKey: string }} config
 * @returns {Promise<{ listings: Listing[], demo: boolean }>}
 */
export async function loadListings(catalog, config) {
  const live = Boolean(config.supabaseUrl && config.supabaseAnonKey);
  let rows;
  if (live) {
    const url = new URL('/rest/v1/public_listings', config.supabaseUrl);
    url.search = new URLSearchParams({ select: '*', order: 'created_at.desc', limit: String(MAX_LISTINGS) }).toString();
    const res = await fetch(url, {
      headers: { apikey: config.supabaseAnonKey, Authorization: `Bearer ${config.supabaseAnonKey}` },
    });
    if (!res.ok) throw new Error(`Listings: HTTP ${res.status}`);
    rows = await res.json();
  } else {
    const res = await fetch('data/demo-listings.json');
    if (!res.ok) throw new Error(`Example listings: HTTP ${res.status}`);
    rows = await res.json();
  }
  if (!Array.isArray(rows)) throw new Error('Listings: expected an array');
  const ctx = { partsById: catalog.partsById, supabaseUrl: live ? config.supabaseUrl : undefined };
  const listings = rows.map((row) => normalizeListing(row, ctx)).filter(Boolean);
  return { listings: /** @type {Listing[]} */ (listings), demo: !live };
}

/**
 * @typedef {'trade'|'sell'|'wanted'|'giveaway'} ListingType
 * @typedef {'new'|'like_new'|'used'|'for_parts'} Condition
 * @typedef {{ id: string, name: string, brand: string, sku: string|null, category: string, aliases: string[], image: string|null, url: string|null }} Part
 * @typedef {{ brands: string[], categories: {id: string, name: string}[], parts: Part[], partsById: Map<string, Part> }} Catalog
 * @typedef {{
 *   id: string, type: ListingType,
 *   have: { part: Part|null, text: string|null } | null,
 *   want: { part: Part|null, text: string|null, priceKzt: number|null } | null,
 *   condition: Condition|null, category: string|null, notes: string|null, city: string,
 *   team: { number: number|null, name: string }, username: string|null,
 *   photos: string[], createdAt: string
 * }} Listing
 */
