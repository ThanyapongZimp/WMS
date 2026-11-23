import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('CLAUDE.md stays lean and points to discovery', () => {
  assert.ok(existsSync('CLAUDE.md'), 'CLAUDE.md missing');
  const text = readFileSync('CLAUDE.md', 'utf8');
  assert.ok(text.split('\n').length <= 200, 'CLAUDE.md over 200 lines');
  for (const s of ['@docs/discovery.md', 'npm run lint', 'npm test']) {
    assert.ok(text.includes(s), `CLAUDE.md missing ${s}`);
  }
  assert.doesNotMatch(text, /\bIMPORTANT\b/);
});

test('AGENTS.md points to discovery', () => {
  assert.ok(existsSync('AGENTS.md'), 'AGENTS.md missing');
  assert.ok(readFileSync('AGENTS.md', 'utf8').includes('docs/discovery.md'));
});
