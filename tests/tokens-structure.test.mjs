import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { loadTokens, aliasTarget, resolve } from './helpers/tokens.mjs';

const tokens = loadTokens();
const entries = Object.entries(tokens);

function aliasesIn(value) {
  if (typeof value === 'string') return [aliasTarget(value)];
  return Object.values(value).map(aliasTarget);
}

test('every token has $type, $value and $description', () => {
  assert.ok(entries.length > 0, 'no tokens found');
  for (const [path, t] of entries) {
    for (const k of ['$type', '$value', '$description']) {
      assert.ok(t[k] !== undefined && t[k] !== '', `${path} missing ${k}`);
    }
  }
});

test('semantic tokens alias primitives only', () => {
  for (const [path, t] of entries.filter(([, t]) => t.tier === 'semantic')) {
    for (const target of aliasesIn(t.$value)) {
      assert.ok(target, `${path} holds a raw value`);
      assert.equal(tokens[target]?.tier, 'primitive', `${path} -> ${target} is not a primitive`);
    }
  }
});

test('component tokens alias semantic tokens only', () => {
  for (const [path, t] of entries.filter(([, t]) => t.tier === 'component')) {
    const target = aliasTarget(t.$value);
    assert.ok(target, `${path} holds a raw value`);
    assert.equal(tokens[target]?.tier, 'semantic', `${path} -> ${target} is not semantic`);
  }
});

test('key values match DESIGN.md and PRODUCT.md', () => {
  assert.equal(resolve(tokens, 'color.primary'), '#4A3FD6');
  assert.equal(resolve(tokens, 'color.warning'), '#F2A516');
  assert.equal(resolve(tokens, 'color.warning-strong'), '#B86E00');
  assert.equal(resolve(tokens, 'target.pda'), '56px');
  assert.equal(resolve(tokens, 'target.pda-primary'), '64px');
});

test('token files declare the DTCG 2025.10 schema', () => {
  for (const tier of ['primitive', 'semantic', 'component']) {
    for (const f of readdirSync(`tokens/${tier}`)) {
      const json = JSON.parse(readFileSync(`tokens/${tier}/${f}`, 'utf8'));
      assert.equal(json.$schema, 'https://www.designtokens.org/schemas/2025.10/format.json', f);
    }
  }
});
