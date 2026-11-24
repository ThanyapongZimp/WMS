import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contrastRatio } from '../scripts/contrast.mjs';
import { loadTokens, resolve } from './helpers/tokens.mjs';

const tokens = loadTokens();
const col = (n) => resolve(tokens, `color.${n}`);
const px = (p) => parseFloat(resolve(tokens, p));

test('contrastRatio matches WCAG reference values', () => {
  assert.ok(Math.abs(contrastRatio('#FFFFFF', '#000000') - 21) < 0.01);
  assert.ok(Math.abs(contrastRatio('#F2A516', '#FFFFFF') - 2.07) < 0.01);
  assert.ok(Math.abs(contrastRatio('rgb(255 255 255)', '#000') - 21) < 0.01);
});

const TEXT = [
  ['foreground', 'background'], ['foreground', 'card'], ['muted-foreground', 'card'],
  ['primary-foreground', 'primary'], ['warning-foreground', 'warning'], ['destructive-foreground', 'destructive'],
  ['accent-foreground', 'accent'], ['pda-bar-foreground', 'pda-bar'],
  ...['success', 'warning', 'info', 'neutral'].map((t) => [`${t}-soft-foreground`, `${t}-soft`]),
  ['danger-soft-foreground', 'danger-soft'],
];
for (const [fg, bg] of TEXT) {
  test(`text ${fg} on ${bg} >= 4.5:1`, () => {
    const r = contrastRatio(col(fg), col(bg));
    assert.ok(r >= 4.5, `${r.toFixed(2)}:1`);
  });
}

const UI = ['warning-strong', 'ring', 'input', 'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'];
for (const fg of UI) {
  test(`ui ${fg} on card >= 3:1`, () => {
    const r = contrastRatio(col(fg), col('card'));
    assert.ok(r >= 3, `${r.toFixed(2)}:1`);
  });
}

test('Thai sans typography never below line-height 1.45', () => {
  for (const [path, t] of Object.entries(tokens)) {
    if (t.$type !== 'typography') continue;
    const v = resolve(tokens, path);
    // Primary family decides the register; mono tokens carry Latin codes (A-03-12) only.
    if (v.fontFamily[0] !== 'IBM Plex Sans Thai') continue;
    assert.ok(v.lineHeight >= 1.45, `${path} line-height ${v.lineHeight}`);
  }
});

test('targets meet PRODUCT.md floors', () => {
  assert.ok(px('target.office') >= 24);
  assert.ok(px('target.station') >= 48);
  assert.ok(px('target.pda') >= 56);
  assert.ok(px('target.pda-primary') >= 64);
  assert.equal(tokens['component.scanner-button.min-height'].$value, '{target.pda-primary}');
});

const SB = 'component.scanner-button';
const VARIANTS = [['', 'fg'], ['danger-', 'danger-fg'], ['secondary-', 'secondary-fg']];

test('every ScannerButton variant has distinct rest, hover and active fills', () => {
  for (const [v] of VARIANTS) {
    const rest = resolve(tokens, `${SB}.${v}bg`);
    const hover = resolve(tokens, `${SB}.${v}bg-hover`);
    const active = resolve(tokens, `${SB}.${v}bg-active`);
    assert.equal(new Set([rest, hover, active]).size, 3, `${v || 'primary-'} rest ${rest} hover ${hover} active ${active}`);
  }
});

for (const [v, fg] of VARIANTS) {
  for (const state of ['bg', 'bg-hover', 'bg-active']) {
    test(`ScannerButton ${v || 'primary-'}${state} label >= 4.5:1`, () => {
      const r = contrastRatio(resolve(tokens, `${SB}.${fg}`), resolve(tokens, `${SB}.${v}${state}`));
      assert.ok(r >= 4.5, `${r.toFixed(2)}:1`);
    });
  }
}

for (const [fg, bg] of [['muted-foreground', 'background'], ['muted-foreground', 'muted']]) {
  test(`text ${fg} on ${bg} >= 4.5:1`, () => assert.ok(contrastRatio(col(fg), col(bg)) >= 4.5));
}
test('ring on background >= 3:1', () => assert.ok(contrastRatio(col('ring'), col('background')) >= 3));

test('mono stack falls back to the Thai family before system fonts', () => {
  const mono = resolve(tokens, 'font.family.mono');
  assert.equal(mono[0], 'IBM Plex Mono');
  assert.equal(mono[1], 'IBM Plex Sans Thai');
});
