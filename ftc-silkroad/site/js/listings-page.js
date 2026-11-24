import { config } from './config.js';
import { loadCatalog, loadListings, LISTING_TYPES, CONDITIONS, telegramLink } from './data.js';
import { h, svg, byId as $, debounce, showError, drawIconPlaceholders, SEARCH_DEBOUNCE_MS } from './dom.js';
import { iconForCategory, UI_ICONS } from './icons.js';
import {
  emptyState, stateFromParams, paramsFromState, applyFilters, filterOptions,
  searchText, activeFilterCount,
} from './filter.js';
import {
  TYPE_LABELS, CONDITION_LABELS, formatAge, haveLabel, wantLabel, teamLabel, partLabel, plural,
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

function media(listing, { large = false } = {}) {
  if (listing.photos.length) {
    return h('img', {
      src: listing.photos[0], alt: haveLabel(listing) ?? wantLabel(listing) ?? 'Listing photo',
      loading: large ? 'eager' : 'lazy', decoding: 'async', width: 400, height: 300,
    });
  }
  return h('div', { class: 'glyph' }, svg(iconForCategory(listing.category ?? 'other'), { size: large ? 96 : 64 }));
}

function typeChip(type) {
  return h('span', { class: `chip type-${type}` }, TYPE_LABELS[type]);
}

/** The have/want block: what the team offers, and what they ask for it. */
function exchange(listing) {
  const have = haveLabel(listing);
  const want = wantLabel(listing);
  const rows = [];
  if (have) rows.push(h('div', { class: 'ex-row' }, h('dt', null, 'Has'), h('dd', null, have)));
  if (have && want) rows.push(h('div', { class: 'ex-swap', 'aria-hidden': 'true' }, svg(UI_ICONS.swap, { size: 16 })));
  if (want) rows.push(h('div', { class: 'ex-row' }, h('dt', null, listing.type === 'wanted' ? 'Looking for' : 'Wants'), h('dd', null, want)));
  return h('dl', { class: 'exchange' }, rows);
}

function contact(listing) {
  const href = demo ? null : telegramLink(listing.username);
  if (!href) {
    return h('span', { class: 'contact is-disabled' }, demo ? 'Example listing' : 'No Telegram username');
  }
  return h('a', { class: 'contact', href, target: '_blank', rel: 'noopener noreferrer' },
    svg(UI_ICONS.telegram, { size: 18 }), `Message @${listing.username}`);
}

/** On a card the title is what the team has (or wants, if it has nothing), and the ask goes under it. */
function card(listing) {
  const have = haveLabel(listing);
  const want = wantLabel(listing);
  const title = have ?? want;
  const ask = have && want
    ? h('div', { class: 'card-ask' }, svg(UI_ICONS.swap, { size: 16 }), h('span', null, h('span', { class: 'ask-label' }, 'Wants '), want))
    : null;
  return h('li', { class: 'card' },
    h('div', { class: 'card-media' }, media(listing), typeChip(listing.type)),
    h('div', { class: 'card-body' },
      h('div', null,
        h('p', { class: 'card-kicker' }, have ? 'Has' : 'Looking for'),
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
  const title = haveLabel(listing) ?? wantLabel(listing);
  const part = listing.have?.part ?? listing.want?.part;
  const photos = listing.photos.length > 1
    ? h('div', { class: 'detail-thumbs' }, listing.photos.slice(1).map((src, i) =>
        h('img', { src, alt: `${title}, photo ${i + 2}`, loading: 'lazy', width: 160, height: 120 })))
    : null;

  // Everything sits in one wrapper so a click on the dialog element itself can only be the backdrop.
  dialog.replaceChildren(h('div', { class: 'detail-inner' },
    h('div', { class: 'detail-media' }, media(listing, { large: true }), typeChip(listing.type)),
    photos,
    h('div', { class: 'detail-body' },
      h('h2', { id: 'detail-title' }, title),
      exchange(listing),
      listing.notes ? h('p', { class: 'detail-notes' }, listing.notes) : null,
      h('dl', { class: 'facts' },
        fact('Team', teamLabel(listing.team)),
        fact('City', listing.city),
        listing.condition ? fact('Condition', CONDITION_LABELS[listing.condition]) : null,
        part?.sku ? fact('Part number', `${part.brand} ${part.sku}`) : null,
        fact('Posted', formatAge(listing.createdAt))),
      h('div', { class: 'detail-actions' },
        contact(listing),
        part ? h('a', { class: 'link-button', href: `?part=${encodeURIComponent(part.id)}` }, 'Other listings with this part') : null),
    ),
    h('button', { type: 'button', class: 'detail-close', 'aria-label': 'Close', onclick: () => dialog.close() },
      svg(UI_ICONS.close, { size: 20 })),
  ));
  if (!dialog.open) dialog.showModal();
  setUrl(id);
}

function fact(label, value) {
  return h('div', null, h('dt', null, label), h('dd', null, value));
}
