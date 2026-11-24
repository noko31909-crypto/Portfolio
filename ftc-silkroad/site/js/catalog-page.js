import { config } from './config.js';
import { loadCatalog, loadListings } from './data.js';
import { h, svg, byId as $, debounce, showError, drawIconPlaceholders, imageOrFallback, SEARCH_DEBOUNCE_MS } from './dom.js';
import { iconForCategory, UI_ICONS } from './icons.js';
import { fold, listingCountsByPart, CATEGORY_KEYWORDS } from './filter.js';
import { plural } from './format.js';

drawIconPlaceholders(UI_ICONS);
init();

async function init() {
  let catalog;
  try {
    catalog = await loadCatalog();
  } catch (err) {
    console.error(err);
    $('catalog-count').textContent = '';
    showError('catalog-error', 'The catalog didn’t load. Check your connection and reload the page.');
    return;
  }
  const counts = await loadListingCounts(catalog);
  const rows = searchableRows(catalog);
  const brands = catalog.brands.filter((b) => rows.some((r) => r.part.brand === b));

  $('brand-nav').replaceChildren(
    h('ul', null, brands.map((b) => h('li', null, h('a', { href: `#${slug(b)}` }, b)))),
  );

  const input = /** @type {HTMLInputElement} */ ($('cq'));
  const render = () => renderCatalog({ rows, brands, categories: catalog.categories, counts, query: input.value });

  input.value = new URLSearchParams(location.search).get('q') ?? '';
  input.addEventListener('input', debounce(() => {
    const q = input.value.trim();
    history.replaceState(null, '', q ? `?${new URLSearchParams({ q })}` : location.pathname);
    render();
  }, SEARCH_DEBOUNCE_MS));
  $('catalog-search').addEventListener('submit', (e) => {
    e.preventDefault();
    $('catalog').focus();
  });
  render();
}

/** Listing counts per part. A bonus: the catalog still works if listings fail to load. */
async function loadListingCounts(catalog) {
  try {
    const { listings } = await loadListings(catalog, config);
    return listingCountsByPart(listings);
  } catch (err) {
    console.error(err);
    return new Map();
  }
}

/** Each part with the folded text a catalog search matches against. */
function searchableRows(catalog) {
  const categoryName = new Map(catalog.categories.map((c) => [c.id, c.name]));
  return catalog.parts.map((part) => ({
    part,
    text: fold([
      part.name, part.brand, part.sku ?? '', ...part.aliases,
      categoryName.get(part.category) ?? '', CATEGORY_KEYWORDS[part.category] ?? '',
    ].join(' ')),
  }));
}

function renderCatalog({ rows, brands, categories, counts, query }) {
  const tokens = fold(query.trim()).split(/\s+/).filter(Boolean);
  const shown = rows.filter((r) => tokens.every((t) => r.text.includes(t))).map((r) => r.part);
  $('catalog-count').textContent = shown.length === rows.length
    ? `${plural(rows.length, 'part', 'parts')} from ${plural(brands.length, 'brand', 'brands')}`
    : `${shown.length} of ${plural(rows.length, 'part', 'parts')}`;
  $('brands').replaceChildren(...brands.map((b) => brandSection(b, shown, categories, counts)).filter(Boolean));
  $('catalog-empty').hidden = shown.length > 0;
}

function brandSection(brand, parts, categories, counts) {
  const brandParts = parts.filter((p) => p.brand === brand);
  if (!brandParts.length) return null;
  const groups = categories
    .map((category) => ({ category, parts: brandParts.filter((p) => p.category === category.id) }))
    .filter((group) => group.parts.length);
  const id = slug(brand);

  return h('section', { class: 'brand', id, 'aria-labelledby': `${id}-title` },
    h('h2', { id: `${id}-title` }, brand, h('span', { class: 'brand-count' }, plural(brandParts.length, 'part', 'parts'))),
    groups.map(({ category, parts: groupParts }) =>
      h('div', { class: 'cat-group' },
        h('h3', null, svg(iconForCategory(category.id), { size: 22 }), category.name),
        h('ul', { class: 'part-rows' }, groupParts.map((p) => partRow(p, counts.get(p.id) ?? 0))),
      )),
  );
}

function partRow(part, count) {
  const glyph = () => h('span', { class: 'part-thumb is-glyph' }, svg(iconForCategory(part.category), { size: 24 }));
  // The part name sits right next to the thumbnail, so the image itself is decorative (alt="").
  const thumb = part.image
    ? imageOrFallback({ src: part.image, alt: '', loading: 'lazy', width: 56, height: 56 }, h('span', { class: 'part-thumb' }), glyph)
    : glyph();
  return h('li', { class: 'part-row' },
    thumb,
    h('span', { class: 'part-name' },
      part.url ? h('a', { href: part.url, target: '_blank', rel: 'noopener noreferrer', title: 'Product page on the maker’s site' }, part.name) : part.name),
    h('span', { class: 'part-sku' }, part.sku ?? ''),
    count
      ? h('a', { class: 'part-count', href: `./?part=${encodeURIComponent(part.id)}` }, plural(count, 'listing', 'listings'))
      : h('span', { class: 'part-count is-zero' }, 'No listings'),
  );
}

/** "REV Robotics" → "rev-robotics", for in-page brand anchors. */
function slug(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
