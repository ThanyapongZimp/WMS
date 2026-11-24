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

function tierViolations(all, tier, allowed) {
  const out = [];
  for (const [path, t] of Object.entries(all).filter(([, t]) => t.tier === tier)) {
    const targets = aliasesIn(t.$value);
    if (targets.length === 0) out.push(`${path} has no value`);
    for (const target of targets) {
      if (!target) out.push(`${path} holds a raw value`);
      else if (all[target]?.tier !== allowed) out.push(`${path} -> ${target} is not ${allowed}`);
    }
  }
  return out;
}

test('tier check catches raw or primitive values inside a composite component token', () => {
  const fake = {
    'font.size.14': { tier: 'primitive', $value: '14px' },
    'typography.body': { tier: 'semantic', $value: '{font.size.14}' },
    'component.x.font': { tier: 'component', $value: { fontSize: '{font.size.14}', fontWeight: 600 } },
  };
  const v = tierViolations(fake, 'component', 'semantic');
  assert.ok(v.some((m) => m.includes('is not semantic')), v.join('; '));
  assert.ok(v.some((m) => m.includes('raw value')), v.join('; '));
});

test('component tokens alias semantic tokens only', () => {
  assert.deepEqual(tierViolations(tokens, 'component', 'semantic'), []);
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
