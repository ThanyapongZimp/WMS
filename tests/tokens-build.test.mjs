import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, cpSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function build(env = {}) {
  const out = mkdtempSync(join(tmpdir(), 'sd-'));
  const r = spawnSync('node', ['sd.config.mjs'], { env: { ...process.env, SD_OUT: out, ...env }, encoding: 'utf8' });
  return { out, status: r.status, stderr: r.stderr };
}

const { out, status } = build();
const css = status === 0 ? readFileSync(join(out, 'css/variables.css'), 'utf8') : '';
const agent = status === 0 ? JSON.parse(readFileSync(join(out, 'agent/tokens.json'), 'utf8')) : { tokens: [] };
const byName = Object.fromEntries(agent.tokens.map((t) => [t.name, t]));

test('build succeeds', () => assert.equal(status, 0));

test('CSS keeps references (outputReferences)', () => {
  assert.match(css, /:root \{/);
  assert.match(css, /--color-primary: var\(--color-indigo-600\);/);
});

test('agent JSON carries resolved value, alias and usage rule', () => {
  const p = byName['color.primary'];
  assert.ok(p, 'color.primary missing');
  assert.equal(p.cssVar, '--color-primary');
  assert.equal(p.value.toUpperCase(), '#4A3FD6');
  assert.equal(p.aliasOf, 'color.indigo.600');
  assert.equal(p.tier, 'semantic');
  assert.match(p.usageRule, /main action/);
  for (const t of agent.tokens) assert.ok(t.usageRule, `${t.name} has no usageRule`);
});

test('a broken alias fails the build', () => {
  const src = mkdtempSync(join(tmpdir(), 'tok-'));
  cpSync('tokens', src, { recursive: true });
  const f = join(src, 'semantic/color.tokens.json');
  const json = JSON.parse(readFileSync(f, 'utf8'));
  json.color.primary.$value = '{color.nope.600}';
  writeFileSync(f, JSON.stringify(json));
  assert.notEqual(build({ SD_SOURCE: src }).status, 0);
});
