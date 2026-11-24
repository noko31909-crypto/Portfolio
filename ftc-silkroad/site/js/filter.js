// Pure filtering, sorting and URL-state helpers. No DOM access, so they run in Node tests.

/** @typedef {import('./data.js').Listing} Listing */
/** @typedef {import('./data.js').Part} Part */

/**
 * @typedef {{
 *   q: string, city: string, types: string[], brand: string, category: string,
 *   condition: string, team: string, part: string, sort: 'newest'|'price'
 * }} FilterState
 */

/** @returns {FilterState} */
export function emptyState() {
  return { q: '', city: '', types: [], brand: '', category: '', condition: '', team: '', part: '', sort: 'newest' };
}

// Filters that live in the URL, so a filtered view can be shared as a link.
const PARAM_KEYS = ['q', 'city', 'brand', 'category', 'condition', 'team', 'part'];
// Longest value read from a URL parameter; real values (a search, a part id) are far shorter.
const MAX_PARAM_LENGTH = 100;

/** @param {URLSearchParams} params @returns {FilterState} */
export function stateFromParams(params) {
  const state = emptyState();
  for (const key of PARAM_KEYS) state[key] = (params.get(key) ?? '').slice(0, MAX_PARAM_LENGTH);
  state.types = (params.get('type') ?? '').split(',').filter(Boolean);
  state.sort = params.get('sort') === 'price' ? 'price' : 'newest';
  return state;
}

/** @param {FilterState} state @returns {URLSearchParams} */
export function paramsFromState(state) {
  const params = new URLSearchParams();
  for (const key of PARAM_KEYS) if (state[key]) params.set(key, state[key]);
  if (state.types.length) params.set('type', state.types.join(','));
  if (state.sort !== 'newest') params.set('sort', state.sort);
  return params;
}

/** Number of narrowing filters in use (search and sort excluded). */
export function activeFilterCount(state) {
  return ['city', 'brand', 'category', 'condition', 'team', 'part'].filter((k) => state[k]).length + (state.types.length ? 1 : 0);
}

/**
 * Lowercase, strip accents, and fold ё to е so "ёлка" finds "елка" and "Mécanum" finds "mecanum".
 * @param {string} s
 */
export function fold(s) {
  return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/ё/g, 'е');
}

// Russian and Kazakh words teams type for each category, so a search for "мотор" or
// "дөңгелек" finds English catalog names.
export const CATEGORY_KEYWORDS = {
  motors: 'motor мотор двигатель қозғалтқыш',
  servos: 'servo серво сервопривод',
  control: 'hub controller хаб контроллер',
  sensors: 'sensor датчик сенсор',
  batteries: 'battery charger батарея аккумулятор зарядка',
  structure: 'channel plate bracket швеллер пластина кронштейн',
  motion: 'gear sprocket shaft bearing шестерня звездочка вал подшипник',
  wheels: 'wheel колесо дөңгелек',
  linear: 'slide rail слайдер направляющая',
  hardware: 'screw nut винт гайка болт',
  cables: 'cable wire кабель провод',
  other: '',
};

function partText(part) {
  if (!part) return '';
  return [part.name, part.brand, part.sku ?? '', ...part.aliases, CATEGORY_KEYWORDS[part.category] ?? ''].join(' ');
}

/** Everything a search box query is matched against, folded once per listing. */
export function searchText(listing) {
  const bits = [
    partText(listing.have?.part),
    listing.have?.text ?? '',
    partText(listing.want?.part),
    listing.want?.text ?? '',
    listing.category ? CATEGORY_KEYWORDS[listing.category] ?? '' : '',
    listing.notes ?? '',
    listing.team.name,
    listing.team.number ? String(listing.team.number) : '',
    listing.city,
  ];
  return fold(bits.join(' '));
}

function listingParts(listing) {
  return [listing.have?.part, listing.want?.part].filter(Boolean);
}

/**
 * @param {Listing[]} listings
 * @param {FilterState} state
 * @param {Map<string, string>} [textIndex] listing id → searchText(), to avoid refolding on every keystroke
 */
export function applyFilters(listings, state, textIndex) {
  const tokens = fold(state.q).split(/\s+/).filter(Boolean);
  const result = listings.filter((l) => {
    if (state.city && l.city !== state.city) return false;
    if (state.types.length && !state.types.includes(l.type)) return false;
    if (state.condition && l.condition !== state.condition) return false;
    if (state.team && teamKey(l) !== state.team) return false;
    if (state.category && l.category !== state.category) return false;
    const parts = listingParts(l);
    if (state.brand && !parts.some((p) => p.brand === state.brand)) return false;
    if (state.part && !parts.some((p) => p.id === state.part)) return false;
    if (tokens.length) {
      const text = textIndex?.get(l.id) ?? searchText(l);
      if (!tokens.every((t) => text.includes(t))) return false;
    }
    return true;
  });
  return sortListings(result, state.sort);
}

/** Newest first; "price" puts priced listings cheapest-first and the rest after, newest first. */
export function sortListings(listings, sort) {
  const byDate = (a, b) => b.createdAt.localeCompare(a.createdAt);
  if (sort !== 'price') return [...listings].sort(byDate);
  return [...listings].sort((a, b) => {
    const pa = a.want?.priceKzt ?? null;
    const pb = b.want?.priceKzt ?? null;
    if (pa !== null && pb !== null && pa !== pb) return pa - pb;
    if (pa === null && pb !== null) return 1;
    if (pb === null && pa !== null) return -1;
    return byDate(a, b);
  });
}

/** Stable key for the team filter: the team number when known, otherwise the name. */
export function teamKey(listing) {
  return listing.team.number ? String(listing.team.number) : `name:${listing.team.name}`;
}

/** Distinct values for the filter dropdowns, sorted for display. */
export function filterOptions(listings) {
  const cities = [...new Set(listings.map((l) => l.city))].sort((a, b) => a.localeCompare(b));
  const teams = new Map();
  for (const l of listings) teams.set(teamKey(l), l.team);
  const teamList = [...teams.entries()]
    .map(([key, team]) => ({ key, label: team.number ? `${team.number} ${team.name}` : team.name, number: team.number ?? Infinity }))
    .sort((a, b) => a.number - b.number || a.label.localeCompare(b.label));
  return { cities, teams: teamList };
}

/** How many active listings mention each part, for the catalog page. */
export function listingCountsByPart(listings) {
  const counts = new Map();
  for (const l of listings) {
    for (const id of new Set(listingParts(l).map((p) => p.id))) counts.set(id, (counts.get(id) ?? 0) + 1);
  }
  return counts;
}
