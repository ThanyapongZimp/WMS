import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

function vale(file) {
  let out;
  try {
    out = execFileSync('vale', ['--output=JSON', '--config=.vale.ini', file], { encoding: 'utf8' });
  } catch (err) {
    out = err.stdout;
  }
  const parsed = JSON.parse(out);
  return Object.values(parsed).flat();
}

const TERMS = ['Login', 'Putaway', 'Pick', 'Wave', 'ShortPick', 'Bin'].map((t) => `WMS.Term${t}`);
const RULES = ['WMS.ThaiSpelling', ...TERMS, 'WMS.GenericButtons', 'WMS.TechErrorCodes', 'WMS.ThaiTrailingPeriod'];

test('bad copy trips every WMS rule', () => {
  const alerts = vale('tests/fixtures/bad.md');
  const checks = alerts.map((a) => a.Check);
  assert.deepEqual([...new Set(checks)].sort(), [...RULES].sort());
  assert.equal(checks.filter((c) => c === 'WMS.ThaiSpelling').length, 5);
});

test('every WMS alert links to its guideline', () => {
  for (const a of vale('tests/fixtures/bad.md')) {
    assert.ok(a.Link && a.Link.length > 0, `${a.Check} has no link`);
  }
});

test('good copy and code spans stay silent', () => {
  assert.deepEqual(vale('tests/fixtures/good.md'), []);
});
