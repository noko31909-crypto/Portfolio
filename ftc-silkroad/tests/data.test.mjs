import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeListing, normalizeCatalog, safeUsername, safePhotoUrl, telegramLink } from '../site/js/data.js';

const catalog = normalizeCatalog({
  brands: ['goBILDA'],
  categories: [{ id: 'motors', name: 'Motors' }],
  parts: [{ id: 'gb-motor', brand: 'goBILDA', name: 'Yellow Jacket 312 RPM', sku: '5203-2402-0019', category: 'motors', aliases: ['yj'] }],
});
const SUPA = 'https://abcd.supabase.co';
const ctx = { partsById: catalog.partsById, supabaseUrl: SUPA };

const row = (over = {}) => ({
  id: 'l1', type: 'sell', have_part_id: 'gb-motor', want_price_kzt: 15000, condition: 'used',
  city: 'Almaty', team_number: 12345, team_name: 'Steppe Bots', tg_username: 'steppe_bots',
  photos: [], created_at: '2026-11-20T10:00:00Z', ...over,
});

test('normalizes a valid row and links the catalog part', () => {
  const l = normalizeListing(row(), ctx);
  assert.equal(l.have.part.sku, '5203-2402-0019');
  assert.equal(l.want.priceKzt, 15000);
  assert.equal(l.category, 'motors');
  assert.equal(l.username, 'steppe_bots');
});

test('drops rows missing required fields or with unknown enums', () => {
  assert.equal(normalizeListing(row({ type: 'auction' }), ctx), null);
  assert.equal(normalizeListing(row({ city: '' }), ctx), null);
  assert.equal(normalizeListing(row({ created_at: 'yesterday' }), ctx), null);
  assert.equal(normalizeListing(row({ have_part_id: null, want_price_kzt: null }), ctx), null);
  assert.equal(normalizeListing(null, ctx), null);
});

test('ignores bad condition, price and team number instead of trusting them', () => {
  const l = normalizeListing(row({ condition: 'mint', want_price_kzt: -5, team_number: 'abc' }), ctx);
  assert.equal(l.condition, null);
  assert.equal(l.want, null);
  assert.equal(l.team.number, null);
});

test('unknown part ids fall back to free text', () => {
  const l = normalizeListing(row({ have_part_id: 'nope', have_text: 'Grey bracket' }), ctx);
  assert.equal(l.have.part, null);
  assert.equal(l.have.text, 'Grey bracket');
});

test('strips control characters and caps text length', () => {
  const l = normalizeListing(row({ have_part_id: null, have_text: `a\u0000b\n${'x'.repeat(500)}` }), ctx);
  assert.ok(!l.have.text.includes('\u0000'));
  assert.ok(l.have.text.length <= 200);
});

test('usernames must match Telegram rules', () => {
  assert.equal(safeUsername('@team_123'), 'team_123');
  assert.equal(safeUsername('abc'), null);
  assert.equal(safeUsername('1team'), null);
  assert.equal(safeUsername('evil/../x'), null);
  assert.equal(safeUsername('javascript:alert(1)'), null);
  assert.equal(telegramLink('team_123'), 'https://t.me/team_123');
  assert.equal(telegramLink('bad name'), null);
});

test('photos only from this project’s public storage path', () => {
  const ok = `${SUPA}/storage/v1/object/public/listing-photos/a.jpg`;
  assert.equal(safePhotoUrl(ok, SUPA), ok);
  assert.equal(safePhotoUrl('https://evil.example/storage/v1/object/public/a.jpg', SUPA), null);
  assert.equal(safePhotoUrl(`http://abcd.supabase.co/storage/v1/object/public/a.jpg`, SUPA), null);
  assert.equal(safePhotoUrl(`${SUPA}/rest/v1/listings`, SUPA), null);
  assert.equal(safePhotoUrl('javascript:alert(1)', SUPA), null);
  assert.equal(safePhotoUrl(ok, undefined), null);
  const l = normalizeListing(row({ photos: [ok, 'https://evil.example/x.jpg'] }), ctx);
  assert.deepEqual(l.photos, [ok]);
});

test('catalog loader skips malformed parts', () => {
  const c = normalizeCatalog({ brands: ['A', 3], categories: [{ id: 'x' }], parts: [{ id: 'p' }, { id: 'q', name: 'Q', brand: 'A' }] });
  assert.deepEqual(c.brands, ['A']);
  assert.equal(c.categories.length, 0);
  assert.equal(c.parts.length, 1);
  assert.equal(c.parts[0].category, 'other');
});
