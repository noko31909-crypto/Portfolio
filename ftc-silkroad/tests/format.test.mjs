import { test } from 'node:test';
import assert from 'node:assert/strict';
import { partLabel, wantLabel, budgetLabel, formatPrice, formatAge } from '../site/js/format.js';

const part = (brand, name) => ({ id: 'x', brand, name, sku: null, category: 'other', aliases: [] });

test('part labels skip a repeated or meaningless brand', () => {
  assert.equal(partLabel(part('goBILDA', 'Grid plate')), 'goBILDA Grid plate');
  assert.equal(partLabel(part('Axon', 'Axon MAX servo MK2')), 'Axon MAX servo MK2');
  assert.equal(partLabel(part('Other', 'Logitech F310 gamepad')), 'Logitech F310 gamepad');
});

test('want label: part, price, or part-or-price; wanted shows the budget separately', () => {
  const hub = part('REV Robotics', 'Expansion Hub');
  assert.equal(wantLabel({ type: 'trade', want: { part: hub, text: null, priceKzt: null } }), 'REV Robotics Expansion Hub');
  assert.equal(wantLabel({ type: 'sell', want: { part: null, text: null, priceKzt: 15000 } }), formatPrice(15000));
  assert.equal(wantLabel({ type: 'trade', want: { part: hub, text: null, priceKzt: 9000 } }), `REV Robotics Expansion Hub or ${formatPrice(9000)}`);
  const wanted = { type: 'wanted', want: { part: hub, text: null, priceKzt: 90000 } };
  assert.equal(wantLabel(wanted), 'REV Robotics Expansion Hub');
  assert.equal(budgetLabel(wanted), formatPrice(90000));
  assert.equal(budgetLabel({ type: 'sell', want: { priceKzt: 1 } }), null);
  assert.equal(wantLabel({ type: 'giveaway', want: null }), null);
});

test('prices use a thin-space thousands separator and the tenge sign', () => {
  assert.match(formatPrice(210000), /^210\s000\s₸$/);
});

test('ages read naturally', () => {
  const now = Date.parse('2026-11-24T12:00:00Z');
  assert.equal(formatAge('2026-11-24T08:00:00Z', now), 'today');
  assert.equal(formatAge('2026-11-23T08:00:00Z', now), 'yesterday');
  assert.equal(formatAge('2026-11-19T08:00:00Z', now), '5 days ago');
  assert.equal(formatAge('2026-09-01T08:00:00Z', now), '1 Sept 2026');
});
