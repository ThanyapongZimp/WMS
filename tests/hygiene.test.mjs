import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scan, REPO_SCOPE } from '../scripts/hygiene.mjs';

test('scan flags emoji and each kind of hardcoded value', () => {
  const f = scan({ emojiPaths: ['tests/fixtures/hygiene/bad.md'], uiPaths: ['tests/fixtures/hygiene/bad.css'] });
  assert.ok(f.some((x) => x.endsWith('emoji')), f.join('\n'));
  for (const v of ['#4A3FD6', '12px', '150ms']) assert.ok(f.some((x) => x.includes(v)), `missed ${v}`);
  assert.equal(f.length, 4, f.join('\n'));
});

test('values inside comments are ignored', () => {
  assert.deepEqual(scan({ emojiPaths: [], uiPaths: ['tests/fixtures/hygiene/ok.css'] }), []);
});

test('repo has no emoji and no hardcoded UI values', () => {
  assert.deepEqual(scan(REPO_SCOPE), []);
});
