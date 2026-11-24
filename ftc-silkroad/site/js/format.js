// Display text for listings. All interface wording lives in this file and the HTML,
// so adding Russian and Kazakh (planned for v1.2) means translating one table.

export const TYPE_LABELS = { trade: 'Trade', sell: 'For sale', wanted: 'Wanted', giveaway: 'Free' };
export const CONDITION_LABELS = { new: 'New', like_new: 'Like new', used: 'Used, works', for_parts: 'For parts' };

const priceFormat = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

/** 15000 → "15 000 ₸" */
export function formatPrice(kzt) {
  return `${priceFormat.format(kzt)} ₸`;
}

const relative = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const DAY = 86_400_000;

/** "today", "yesterday", "5 days ago", then a date after a month. */
export function formatAge(iso, now = Date.now()) {
  const days = Math.floor((now - Date.parse(iso)) / DAY);
  if (days < 1) return 'today';
  if (days < 31) return relative.format(-days, 'day');
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function partLabel(part) {
  return `${part.brand} ${part.name}`;
}

/** What a listing offers, as one line. */
export function haveLabel(listing) {
  const h = listing.have;
  if (!h) return null;
  return h.part ? partLabel(h.part) : h.text;
}

/** What a listing asks for, as one line: a part, a price, or both. */
export function wantLabel(listing) {
  const w = listing.want;
  // A giveaway asks for nothing; the "Free" chip already says so.
  if (!w) return null;
  const bits = [];
  if (w.part) bits.push(partLabel(w.part));
  else if (w.text) bits.push(w.text);
  if (w.priceKzt !== null) bits.push(w.part || w.text ? `or ${formatPrice(w.priceKzt)}` : formatPrice(w.priceKzt));
  return bits.join(' ');
}

export function teamLabel(team) {
  return team.number ? `${team.number} ${team.name}` : team.name;
}

export function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}
