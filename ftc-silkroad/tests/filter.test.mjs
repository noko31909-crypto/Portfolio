import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  applyFilters, emptyState, stateFromParams, paramsFromState, fold, filterOptions,
  listingCountsByPart, activeFilterCount,
} from '../site/js/filter.js';

const motor = { id: 'gb-312', brand: 'goBILDA', name: 'Yellow Jacket motor, 312 RPM', sku: '5203-2402-0019', category: 'motors', aliases: ['yj 312'] };
const hex = { id: 'rev-corehex', brand: 'REV Robotics', name: 'Core Hex Motor', sku: 'REV-41-1300', category: 'motors', aliases: ['core hex'] };
const wheel = { id: 'gb-mecanum', brand: 'goBILDA', name: 'Mecanum wheel set, 104 mm', sku: null, category: 'wheels', aliases: [] };

const L = (id, over) => ({
  id, type: 'sell', have: null, want: null, condition: 'used', category: null, notes: null,
  city: 'Almaty', team: { number: 100, name: 'Alpha' }, username: 'alpha_team', photos: [],
  createdAt: '2026-11-01T00:00:00Z', ...over,
});

const listings = [
  L('a', { have: { part: motor, text: null }, want: { part: null, text: null, priceKzt: 20000 }, category: 'motors', createdAt: '2026-11-03T00:00:00Z' }),
  L('b', { type: 'trade', have: { part: wheel, text: null }, want: { part: hex, text: null, priceKzt: null }, category: 'wheels', city: 'Astana', team: { number: 200, name: 'Beta' } }),
  L('c', { type: 'giveaway', have: { part: null, text: 'Серая скоба' }, category: 'structure', city: 'Shymkent', team: { number: null, name: 'Гамма' }, createdAt: '2026-11-05T00:00:00Z' }),
  L('d', { type: 'wanted', want: { part: hex, text: null, priceKzt: 8000 }, category: 'motors', createdAt: '2026-11-02T00:00:00Z' }),
];

const ids = (arr) => arr.map((l) => l.id);
const run = (over) => ids(applyFilters(listings, { ...emptyState(), ...over }));

test('no filters returns everything, newest first', () => {
  assert.deepEqual(run({}), ['c', 'a', 'd', 'b']);
});

test('search matches part name, SKU, alias, team and Russian category words', () => {
  assert.deepEqual(run({ q: 'core hex' }), ['d', 'b']);
  assert.deepEqual(run({ q: '5203-2402' }), ['a']);
  assert.deepEqual(run({ q: 'beta' }), ['b']);
  assert.deepEqual(run({ q: 'мотор' }), ['a', 'd', 'b']);
  assert.deepEqual(run({ q: 'скоба' }), ['c']);
  assert.deepEqual(run({ q: 'yellow 312' }), ['a']);
  assert.deepEqual(run({ q: 'yellow hex' }), []);
});

test('filters combine', () => {
  assert.deepEqual(run({ city: 'Astana' }), ['b']);
  assert.deepEqual(run({ types: ['trade', 'giveaway'] }), ['c', 'b']);
  assert.deepEqual(run({ brand: 'REV Robotics' }), ['d', 'b']);
  assert.deepEqual(run({ category: 'motors', types: ['sell'] }), ['a']);
  assert.deepEqual(run({ part: 'rev-corehex' }), ['d', 'b']);
  assert.deepEqual(run({ team: 'name:Гамма' }), ['c']);
  assert.deepEqual(run({ team: '200' }), ['b']);
});

test('price sort puts priced listings first, cheapest first', () => {
  assert.deepEqual(run({ sort: 'price' }), ['d', 'a', 'c', 'b']);
});

test('URL state round-trips and rejects junk', () => {
  const state = { ...emptyState(), q: 'servo', city: 'Almaty', types: ['trade', 'sell'], sort: 'price' };
  assert.deepEqual(stateFromParams(paramsFromState(state)), state);
  const junk = stateFromParams(new URLSearchParams('sort=evil&q=' + 'x'.repeat(500)));
  assert.equal(junk.sort, 'newest');
  assert.equal(junk.q.length, 100);
  assert.equal(paramsFromState(emptyState()).toString(), '');
});

test('active filter count ignores search and sort', () => {
  assert.equal(activeFilterCount({ ...emptyState(), q: 'x', sort: 'price' }), 0);
  assert.equal(activeFilterCount({ ...emptyState(), city: 'A', types: ['sell', 'trade'] }), 2);
});

test('fold handles case, accents and ё', () => {
  assert.equal(fold('Mécanum ЁЛКА'), 'mecanum елка');
});

test('filter options list each city and team once', () => {
  const { cities, teams } = filterOptions(listings);
  assert.deepEqual(cities, ['Almaty', 'Astana', 'Shymkent']);
  assert.deepEqual(teams.map((t) => t.label), ['100 Alpha', '200 Beta', 'Гамма']);
});

test('catalog counts count each listing once per part', () => {
  const counts = listingCountsByPart(listings);
  assert.equal(counts.get('rev-corehex'), 2);
  assert.equal(counts.get('gb-312'), 1);
});
