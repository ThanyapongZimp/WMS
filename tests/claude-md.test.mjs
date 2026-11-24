import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const countLines = (text) => text.trimEnd().split('\n').length;

test('line counter matches wc -l for a trailing newline', () => {
  assert.equal(countLines('a\n'.repeat(200)), 200);
  assert.equal(countLines('a\n'.repeat(201)), 201);
  assert.equal(countLines('a\nb'), 2);
});

test('CLAUDE.md stays lean and points to discovery', () => {
  assert.ok(existsSync('CLAUDE.md'), 'CLAUDE.md missing');
  const text = readFileSync('CLAUDE.md', 'utf8');
  assert.ok(countLines(text) <= 200, 'CLAUDE.md over 200 lines');
  for (const s of ['@docs/discovery.md', 'npm run lint', 'npm test']) {
    assert.ok(text.includes(s), `CLAUDE.md missing ${s}`);
  }
  assert.doesNotMatch(text, /\bIMPORTANT\b/);
});

test('AGENTS.md points to discovery', () => {
  assert.ok(existsSync('AGENTS.md'), 'AGENTS.md missing');
  assert.ok(readFileSync('AGENTS.md', 'utf8').includes('docs/discovery.md'));
});

test('Vale lints the product docs too', () => {
  const { scripts } = JSON.parse(readFileSync('package.json', 'utf8'));
  for (const f of ['docs', 'CLAUDE.md', 'AGENTS.md', 'PRODUCT.md', 'README.md']) {
    assert.ok(scripts['lint:vale'].split(' ').includes(f), `lint:vale misses ${f}`);
  }
});
