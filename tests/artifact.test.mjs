import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('artifact/tokens/index.html', 'utf8');
const between = (s, a, b) => s.slice(s.indexOf(a) + a.length, s.indexOf(b));

test('artifact embeds the current built CSS', () => {
  assert.equal(between(html, '/* tokens:start */', '/* tokens:end */').trim(), readFileSync('build/css/variables.css', 'utf8').trim());
});

test('artifact embeds the current register CSS', () => {
  assert.equal(between(html, '/* registers:start */', '/* registers:end */').trim(), readFileSync('src/foundations/registers.css', 'utf8').trim());
});

test('every semantic colour token is listed on the page', () => {
  const tokens = JSON.parse(readFileSync('build/agent/tokens.json', 'utf8')).tokens;
  for (const t of tokens.filter((x) => x.tier === 'semantic' && x.type === 'color')) {
    assert.ok(html.includes(t.cssVar), `${t.cssVar} missing`);
  }
});

test('page has no emoji', () => {
  assert.equal(/\p{Extended_Pictographic}/u.test(html), false);
});

test('every inline script parses', () => {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  assert.ok(scripts.length >= 2);
  for (const s of scripts) assert.doesNotThrow(() => new Function(s));
});
