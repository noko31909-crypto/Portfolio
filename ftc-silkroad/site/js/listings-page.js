import { config } from './config.js';
import { loadCatalog, loadListings, LISTING_TYPES, CONDITIONS, telegramLink } from './data.js';
import { h, svg, byId as $, debounce, showError, drawIconPlaceholders, imageOrFallback, SEARCH_DEBOUNCE_MS } from './dom.js';
import { iconForCategory, UI_ICONS } from './icons.js';
import {
  emptyState, stateFromParams, paramsFromState, applyFilters, filterOptions,
  searchText, activeFilterCount,
} from './filter.js';
import {
  TYPE_LABELS, CONDITION_LABELS, formatAge, haveLabel, wantLabel, budgetLabel, teamLabel, partLabel, plural,
} from './format.js';

/** @type {import('./data.js').Catalog} */
let catalog;
/** @type {import('./data.js').Listing[]} */
let listings = [];
let demo = false;
let state = stateFromParams(new URLSearchParams(location.search));
const textIndex = new Map();

drawIconPlaceholders(UI_ICONS);
renderBotCta();
init();

async function init() {
  try {
    catalog = await loadCatalog();
    ({ listings, demo } = await loadListings(catalog, config));
  } catch (err) {
    console.error(err);
    $('results-count').textContent = '';
    showError('error', 'Listings didn’t load. Check your connection and reload the page.');
    return;
  }
  for (const l of listings) textIndex.set(l.id, searchText(l));
  $('demo-note').hidden = !demo;
  buildFilters();
  syncControls();
  bindEvents();
  render();
  const openId = new URLSearchParams(location.search).get('listing');
  if (openId) openDetail(openId, { fromUrl: true });
}

function renderBotCta() {
  const el = $('bot-cta');
  if (!config.botUsername) {
    el.textContent = 'The posting bot isn’t public yet. Ask in the FTC Kazakhstan parts channel for the link.';
    return;
  }
  const href = telegramLink(config.botUsername);
  el.append('To post a part, open ', h('a', { href, rel: 'noopener' }, `@${config.botUsername}`), ' in Telegram.');
}

// ---- Filters -------------------------------------------------------------

function buildFilters() {
  const toggles = $('type-toggles');
  for (const type of LISTING_TYPES) {
    toggles.append(
      h('button', { type: 'button', class: `type-toggle type-${type}`, 'aria-pressed': 'false', dataset: { type } }, TYPE_LABELS[type]),
    );
  }
  const { cities, teams } = filterOptions(listings);
  addOptions('f-city', cities.map((c) => [c, c]));
  const usedBrands = new Set(catalog.parts.map((p) => p.brand));
  addOptions('f-brand', catalog.brands.filter((b) => usedBrands.has(b)).map((b) => [b, b]));
  addOptions('f-category', catalog.categories.map((c) => [c.id, c.name]));
  addOptions('f-condition', CONDITIONS.map((c) => [c, CONDITION_LABELS[c]]));
  addOptions('f-team', teams.map((t) => [t.key, t.label]));
}

function addOptions(selectId, pairs) {
  const select = $(selectId);
  for (const [value, label] of pairs) select.append(h('option', { value }, label));
}

/** Puts the current state into the form controls (on load and after "Clear"). */
function syncControls() {
  /** @type {HTMLInputElement} */ ($('q')).value = state.q;
  for (const select of document.querySelectorAll('select[data-filter]')) {
    const s = /** @type {HTMLSelectElement} */ (select);
    const key = s.dataset.filter;
    // Ignore a value from the URL that isn't one of the options (stale or hand-edited link).
    s.value = [...s.options].some((o) => o.value === state[key]) ? state[key] : '';
    state[key] = s.value;
  }
  for (const btn of document.querySelectorAll('.type-toggle')) {
    btn.setAttribute('aria-pressed', String(state.types.includes(/** @type {HTMLElement} */ (btn).dataset.type)));
  }
  state.types = state.types.filter((t) => LISTING_TYPES.includes(t));
  if (state.part && !catalog.partsById.has(state.part)) state.part = '';
  /** @type {HTMLSelectElement} */ ($('sort')).value = state.sort;
}

function bindEvents() {
  const search = /** @type {HTMLInputElement} */ ($('q'));
  search.addEventListener('input', debounce(() => update({ q: search.value.trim() }), SEARCH_DEBOUNCE_MS));
  $('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    update({ q: /** @type {HTMLInputElement} */ ($('q')).value.trim() });
    $('results').focus();
  });
  for (const select of document.querySelectorAll('select[data-filter]')) {
    select.addEventListener('change', (e) => {
      const s = /** @type {HTMLSelectElement} */ (e.target);
      update({ [s.dataset.filter]: s.value });
    });
  }
  $('type-toggles').addEventListener('click', (e) => {
    const btn = /** @type {HTMLElement} */ (e.target).closest('.type-toggle');
    if (!btn) return;
    const type = /** @type {HTMLElement} */ (btn).dataset.type;
    const on = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(on));
    update({ types: on ? [...state.types, type] : state.types.filter((t) => t !== type) });
  });
  $('sort').addEventListener('change', (e) => update({ sort: /** @type {HTMLSelectElement} */ (e.target).value === 'price' ? 'price' : 'newest' }));
  $('clear-filters').addEventListener('click', clearFilters);
  $('empty-clear').addEventListener('click', clearFilters);
  $('filters-toggle').addEventListener('click', () => {
    const open = $('filters').classList.toggle('is-open');
    $('filters-toggle').setAttribute('aria-expanded', String(open));
  });
  $('cards').addEventListener('click', (e) => {
    const btn = /** @type {HTMLElement} */ (e.target).closest('[data-open]');
    if (btn) openDetail(/** @type {HTMLElement} */ (btn).dataset.open);
  });
  $('detail').addEventListener('close', () => setUrl());
  // The dialog's content sits in one wrapper, so a click on the dialog itself is the backdrop.
  $('detail').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) /** @type {HTMLDialogElement} */ (e.currentTarget).close();
  });
  window.addEventListener('popstate', () => {
    state = stateFromParams(new URLSearchParams(location.search));
    syncControls();
    render();
  });
}

function clearFilters() {
  state = { ...emptyState(), sort: state.sort };
  syncControls();
  setUrl();
  render();
}

function update(patch) {
  state = { ...state, ...patch };
  setUrl();
  render();
}

function setUrl(listingId) {
  const params = paramsFromState(state);
  if (listingId) params.set('listing', listingId);
  const qs = params.toString();
  history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
}

// ---- Results -------------------------------------------------------------

function render() {
  const shown = applyFilters(listings, state, textIndex);
  const total = listings.length;
  $('results-count').textContent = shown.length === total
    ? plural(total, 'listing', 'listings')
    : `${shown.length} of ${plural(total, 'listing', 'listings')}`;

  const active = activeFilterCount(state);
  $('clear-filters').hidden = active === 0;
  $('filters-toggle-label').textContent = active ? `Filters (${active})` : 'Filters';
  renderActivePart();

  $('cards').replaceChildren(...shown.map(card));
  $('empty').hidden = shown.length > 0;
}

function renderActivePart() {
  const box = $('active-part');
  const part = state.part ? catalog.partsById.get(state.part) : null;
  box.hidden = !part;
  if (!part) return box.replaceChildren();
  box.replaceChildren(
    h('p', null, 'Listings with ', h('strong', null, partLabel(part)), part.sku ? ` (${part.sku})` : ''),
    h('button', { type: 'button', class: 'link-button', onclick: () => update({ part: '' }) }, 'Show all parts'),
  );
}

/** The part a listing is about: what it offers, or what a wanted listing looks for. */
function mainPart(listing) {
  return listing.type === 'wanted'
    ? listing.want?.part ?? listing.have?.part ?? null
    : listing.have?.part ?? listing.want?.part ?? null;
}

/**
 * The team's own photo if there is one; otherwise the vendor's catalog photo of the
 * part, labelled so nobody mistakes it for the actual item; otherwise a category drawing.
 */
function media(listing, { large = false } = {}) {
  const loading = large ? 'eager' : 'lazy';
  const glyph = () => h('div', { class: 'glyph' }, svg(iconForCategory(listing.category ?? 'other'), { size: large ? 96 : 64 }));
  if (listing.photos.length) {
    return imageOrFallback(
      { src: listing.photos[0], alt: haveLabel(listing) ?? wantLabel(listing) ?? 'Listing photo', loading, width: 400, height: 300 },
      h('div', { class: 'team-photo' }), glyph);
  }
  const part = mainPart(listing);
  if (part?.image) {
    return imageOrFallback(
      { src: part.image, alt: `${partLabel(part)}, catalog photo`, loading, width: 400, height: 300 },
      h('figure', { class: 'catalog-photo' }, h('figcaption', null, 'Catalog photo')), glyph);
  }
  return glyph();
}

function typeChip(type) {
  return h('span', { class: `chip type-${type}` }, TYPE_LABELS[type]);
}

/**
 * The terms block in the detail dialog. The dialog heading already names the main
 * part, so this lists the rest: what a team wants for its part, what a wanted listing
 * offers in trade, and a wanted listing's budget.
 */
function terms(listing) {
  const isWanted = listing.type === 'wanted';
  const have = haveLabel(listing);
  const want = wantLabel(listing);
  const budget = budgetLabel(listing);
  const row = (label, value) => h('div', { class: 'ex-row' }, h('dt', null, label), h('dd', null, value));
  const rows = isWanted
    ? [want && have ? row('Can trade', have) : null, budget ? row('Budget', budget) : null]
    : [have && want ? row('Wants', want) : null];
  return rows.some(Boolean) ? h('dl', { class: 'exchange' }, rows) : null;
}

function contact(listing) {
  const href = demo ? null : telegramLink(listing.username);
  if (!href) {
    return h('span', { class: 'contact is-disabled' }, demo ? 'Example listing' : 'No Telegram username');
  }
  return h('a', { class: 'contact', href, target: '_blank', rel: 'noopener noreferrer' },
    svg(UI_ICONS.telegram, { size: 18 }), `Message @${listing.username}`);
}

/**
 * On a card the title is the part on offer, or for a wanted listing the part sought.
 * Under it, in saffron, is what the team asks in return (or a wanted listing's budget).
 */
function card(listing) {
  const have = haveLabel(listing);
  const want = wantLabel(listing);
  const isWanted = listing.type === 'wanted';
  const title = isWanted ? want ?? have : have ?? want;
  const kicker = isWanted ? 'Looking for' : have ? 'Has' : 'Wants';
  const [askLabel, askValue] = isWanted ? ['Budget', budgetLabel(listing)] : ['Wants', have ? want : null];
  const ask = askValue
    ? h('div', { class: 'card-ask' }, svg(UI_ICONS.swap, { size: 16 }), h('span', null, h('span', { class: 'ask-label' }, `${askLabel} `), askValue))
    : null;
  return h('li', { class: 'card' },
    h('div', { class: 'card-media' }, media(listing)),
    h('div', { class: 'card-body' },
      typeChip(listing.type),
      h('div', null,
        h('p', { class: 'card-kicker' }, kicker),
        h('h3', { class: 'card-title' },
          h('button', { type: 'button', class: 'card-open', dataset: { open: listing.id } }, title))),
      ask,
      h('p', { class: 'card-meta' },
        h('span', { class: 'team' }, teamLabel(listing.team)),
        h('span', null, `${listing.city}, ${formatAge(listing.createdAt)}`),
        listing.condition ? h('span', null, CONDITION_LABELS[listing.condition]) : null),
    ),
    h('div', { class: 'card-foot' }, contact(listing)),
  );
}

// ---- Detail dialog -------------------------------------------------------

function openDetail(id, { fromUrl = false } = {}) {
  const listing = listings.find((l) => l.id === id);
  if (!listing) {
    if (fromUrl) setUrl();
    return;
  }
  const dialog = /** @type {HTMLDialogElement} */ ($('detail'));
  const title = listing.type === 'wanted'
    ? wantLabel(listing) ?? haveLabel(listing)
    : haveLabel(listing) ?? wantLabel(listing);
  const part = mainPart(listing);
  const photos = listing.photos.length > 1
    ? h('div', { class: 'detail-thumbs' }, listing.photos.slice(1).map((src, i) =>
        h('img', { src, alt: `${title}, photo ${i + 2}`, loading: 'lazy', width: 160, height: 120 })))
    : null;

  // Everything sits in one wrapper so a click on the dialog element itself can only be the backdrop.
  dialog.replaceChildren(h('div', { class: 'detail-inner' },
    h('div', { class: 'detail-media' }, media(listing, { large: true }), typeChip(listing.type)),
    photos,
    h('div', { class: 'detail-body' },
      h('div', null,
        h('p', { class: 'card-kicker' }, listing.type === 'wanted' ? 'Looking for' : 'Has'),
        h('h2', { id: 'detail-title' }, title)),
      terms(listing),
      listing.notes ? h('p', { class: 'detail-notes' }, listing.notes) : null,
      h('dl', { class: 'facts' },
        fact('Team', teamLabel(listing.team)),
        fact('City', listing.city),
        listing.condition ? fact('Condition', CONDITION_LABELS[listing.condition]) : null,
        part?.sku ? fact('Part number', part.sku) : null,
        fact('Posted', formatAge(listing.createdAt))),
      photoCredit(listing, part),
      h('div', { class: 'detail-actions' },
        contact(listing),
        part ? h('a', { class: 'link-button', href: `?part=${encodeURIComponent(part.id)}` }, 'Other listings with this part') : null),
    ),
    // autofocus keeps the dialog scrolled to the top instead of jumping to the first link.
    h('button', { type: 'button', class: 'detail-close', 'aria-label': 'Close', autofocus: true, onclick: () => dialog.close() },
      svg(UI_ICONS.close, { size: 20 })),
  ));
  if (!dialog.open) dialog.showModal();
  setUrl(id);
}

/** When the dialog shows the vendor's photo instead of the team's, say whose it is. */
function photoCredit(listing, part) {
  if (listing.photos.length || !part?.image) return null;
  const source = part.url ? new URL(part.url).hostname.replace(/^www\./, '') : part.brand;
  return h('p', { class: 'photo-credit' },
    'The photo is the maker’s catalog picture, not this team’s part. Source: ',
    part.url ? h('a', { href: part.url, target: '_blank', rel: 'noopener noreferrer' }, source) : source, '.');
}

function fact(label, value) {
  return h('div', null, h('dt', null, label), h('dd', null, value));
}
