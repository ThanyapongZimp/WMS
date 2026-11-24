import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { checkText } from '../scripts/thai-a11y-check.mjs';

const F = 'tests/fixtures/thai-a11y';
const rules = (file) => checkText(readFileSync(`${F}/${file}`, 'utf8'), file).map((f) => f.rule);
const count = (list, rule) => list.filter((r) => r === rule).length;

test('bad CSS trips every CSS rule with line numbers', () => {
  const found = checkText(readFileSync(`${F}/bad.css`, 'utf8'), 'bad.css');
  assert.deepEqual(found.map((f) => [f.rule, f.line]), [
    ['word-break-all', 1], ['letter-spacing', 2], ['text-transform-upper', 3], ['line-height-floor', 4], ['line-height-floor', 5],
  ]);
});

test('good CSS, comments and ignore markers stay silent', () => {
  assert.deepEqual(rules('good.css'), []);
});

test('Thai date formatters must pin the Gregorian calendar', () => {
  assert.equal(count(rules('bad.tsx'), 'calendar-not-pinned'), 3);
  assert.deepEqual(rules('good.tsx'), []);
});

test('HTML needs a lang attribute and inline styles are checked', () => {
  const bad = rules('bad.html');
  assert.equal(count(bad, 'html-lang'), 1);
  assert.equal(count(bad, 'word-break-all'), 1);
  assert.deepEqual(rules('good.html'), []);
});

test('every finding names a fix', () => {
  for (const f of checkText(readFileSync(`${F}/bad.css`, 'utf8'), 'bad.css')) assert.ok(f.fix.length > 10, f.rule);
});

test('CLI exits 1 on findings and 0 on a clean repo', () => {
  const bad = spawnSync('node', ['scripts/thai-a11y-check.mjs', F], { encoding: 'utf8' });
  assert.equal(bad.status, 1);
  assert.match(bad.stdout, /bad\.css:1 word-break-all/);
  const repo = spawnSync('node', ['scripts/thai-a11y-check.mjs'], { encoding: 'utf8' });
  assert.equal(repo.status, 0, repo.stdout);
});
