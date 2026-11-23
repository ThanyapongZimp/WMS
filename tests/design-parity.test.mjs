import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

const cfg = JSON.parse(readFileSync('tests/fixtures/design-token-map.json', 'utf8'));
const md = readFileSync(cfg.designMd, 'utf8');
const fm = parse(md.split(/^---$/m)[1]);
const tokens = JSON.parse(readFileSync('build/agent/tokens.json', 'utf8')).tokens;
const byName = new Map(tokens.map((t) => [t.name, t]));

// A DESIGN.md key maps to the token of the same name in its group unless the map says otherwise.
function tokenFor(key) {
  if (cfg.map[key]) return cfg.map[key];
  const [group, name] = key.split('.');
  if (group === 'colors') return `color.${name}`;
  if (/^\d+$/.test(name)) return `space.${name}`;
  return null;
}

const norm = (v) => String(v).trim().toLowerCase();

for (const group of ['colors', 'spacing']) {
  for (const [name, value] of Object.entries(fm[group])) {
    const key = `${group}.${name}`;
    test(`DESIGN.md ${key} has a matching token`, () => {
      if (cfg.unmapped[key] && !byName.has(tokenFor(key))) return;
      const path = tokenFor(key);
      assert.ok(path, `${key} has no token mapping; add it to design-token-map.json`);
      const tok = byName.get(path);
      assert.ok(tok, `${key} -> ${path} is not in build/agent/tokens.json`);
      assert.equal(norm(tok.value), norm(value), `${path} = ${tok.value}, DESIGN.md says ${value}`);
    });
  }
}
