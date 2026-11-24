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

/** "goBILDA Grid plate…", but "Axon MAX servo" (not "Axon Axon…") and no "Other" prefix. */
export function partLabel(part) {
  if (part.brand === 'Other' || part.name.toLowerCase().startsWith(part.brand.toLowerCase())) return part.name;
  return `${part.brand} ${part.name}`;
}

/** What a listing offers, as one line. */
export function haveLabel(listing) {
  const h = listing.have;
  if (!h) return null;
  return h.part ? partLabel(h.part) : h.text;
}

/**
 * What a listing asks for, as one line. For trades and sales that's a part, a price,
 * or "part or price". For a wanted listing it's only the part; its price is a budget
 * (see budgetLabel). A giveaway asks for nothing; the "Free" chip says so.
 */
export function wantLabel(listing) {
  const w = listing.want;
  if (!w) return null;
  const item = w.part ? partLabel(w.part) : w.text;
  if (listing.type === 'wanted') return item;
  if (w.priceKzt === null) return item;
  return item ? `${item} or ${formatPrice(w.priceKzt)}` : formatPrice(w.priceKzt);
}

/** A wanted listing's price is what the team can pay. */
export function budgetLabel(listing) {
  return listing.type === 'wanted' && listing.want?.priceKzt != null ? formatPrice(listing.want.priceKzt) : null;
}

export function teamLabel(team) {
  return team.number ? `${team.number} ${team.name}` : team.name;
}

export function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}
