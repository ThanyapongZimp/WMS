import { test } from 'node:test';
import assert from 'node:assert/strict';
import { oklch } from 'culori';
import { contrastRatio } from '../scripts/contrast.mjs';
import { deriveTenantPrimary, DEFAULT_PRIMARY } from '../src/theme/tenant-primary.mjs';

const WHITE = '#FFFFFF';
const hueDiff = (a, b) => { const d = Math.abs(a - b) % 360; return Math.min(d, 360 - d); };

test('default primary is returned unchanged', () => {
  const r = deriveTenantPrimary('#4A3FD6');
  assert.equal(r.adjusted, false);
  assert.equal(r.primary.toUpperCase(), '#4A3FD6');
  assert.equal(r.primaryHover.toUpperCase(), '#3B31B8');
  assert.equal(r.accent.toUpperCase(), '#EEEDFC');
  assert.equal(r.accentForeground.toUpperCase(), '#2F2894');
});

test('yellow is darkened until it passes 4.5:1 on white', () => {
  const r = deriveTenantPrimary('#FFFF00');
  assert.equal(r.adjusted, true);
  assert.ok(contrastRatio(r.primary, WHITE) >= 4.5);
});

test('near-white still passes and keeps its hue', () => {
  const r = deriveTenantPrimary('#7B6CFF');
  assert.ok(contrastRatio(r.primary, WHITE) >= 4.5);
  assert.ok(hueDiff(oklch(r.primary).h, oklch('#7B6CFF').h) < 5);
  const w = deriveTenantPrimary('#FAFAFF');
  assert.ok(contrastRatio(w.primary, WHITE) >= 4.5);
});

test('a dark enough colour is used as is', () => {
  const r = deriveTenantPrimary('#0B6E4F');
  assert.equal(r.adjusted, false);
  assert.equal(r.primary.toUpperCase(), '#0B6E4F');
});

test('invalid input falls back to the default without throwing', () => {
  for (const bad of ['abc', '', '   ', null, undefined, '#12']) {
    const r = deriveTenantPrimary(bad);
    assert.equal(r.primary.toUpperCase(), DEFAULT_PRIMARY);
    assert.equal(r.adjusted, false);
  }
});

test('every sampled hue passes, and derived pairs pass too', () => {
  for (let h = 0; h < 360; h += 30) {
    const r = deriveTenantPrimary(`oklch(0.8 0.15 ${h})`);
    assert.ok(contrastRatio(r.primary, WHITE) >= 4.5, `hue ${h} primary`);
    assert.ok(contrastRatio(r.primaryHover, WHITE) >= 4.5, `hue ${h} hover`);
    assert.ok(contrastRatio(r.accentForeground, r.accent) >= 4.5, `hue ${h} accent pair`);
    assert.ok(contrastRatio(r.primary, r.accent) >= 3, `hue ${h} primary on accent`);
  }
});
