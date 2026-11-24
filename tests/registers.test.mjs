import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/foundations/registers.css', 'utf8');
const vars = readFileSync('build/css/variables.css', 'utf8');

test('registers.css defines office, station and pda blocks', () => {
  assert.match(css, /:root\s*\{[^}]*--control-height/);
  assert.match(css, /\[data-register="station"\]\s*\{[^}]*--control-height/);
  assert.match(css, /\[data-register="pda"\]\s*\{[^}]*--control-height/);
});

test('registers.css uses only existing token variables', () => {
  const decls = [...css.matchAll(/--[\w-]+\s*:\s*([^;]+);/g)].map((m) => m[1].trim());
  assert.ok(decls.length >= 6);
  for (const v of decls) {
    const m = v.match(/^var\((--[\w-]+)\)$/);
    assert.ok(m, `raw value not allowed: ${v}`);
    assert.ok(vars.includes(`${m[1]}:`), `${m[1]} is not a built token`);
  }
});
