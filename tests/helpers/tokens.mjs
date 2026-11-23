import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ALIAS = /^\{([a-z0-9.-]+)\}$/;

function walkFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walkFiles(p) : p.endsWith('.tokens.json') ? [p] : [];
  });
}

function flatten(node, path, tier, out) {
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    const p = path ? `${path}.${key}` : key;
    if (value && typeof value === 'object' && '$value' in value) {
      out[p] = { ...value, tier };
    } else if (value && typeof value === 'object') {
      flatten(value, p, tier, out);
    }
  }
}

/** Flatten every tokens/**\/*.tokens.json into dot paths with their tier. */
export function loadTokens(root = 'tokens') {
  const out = {};
  for (const file of walkFiles(root)) {
    const tier = file.split(/[\\/]/)[1];
    flatten(JSON.parse(readFileSync(file, 'utf8')), '', tier, out);
  }
  return out;
}

export function aliasTarget(value) {
  const m = typeof value === 'string' && value.match(ALIAS);
  return m ? m[1] : null;
}

/** Follow aliases to a raw value. Throws on a broken reference. */
export function resolve(tokens, path, seen = new Set()) {
  if (seen.has(path)) throw new Error(`alias cycle at ${path}`);
  seen.add(path);
  const token = tokens[path];
  if (!token) throw new Error(`missing token ${path}`);
  const v = token.$value;
  const target = aliasTarget(v);
  if (target) return resolve(tokens, target, seen);
  if (v && typeof v === 'object' && !Array.isArray(v)) {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => {
      const t = aliasTarget(x);
      return [k, t ? resolve(tokens, t, new Set()) : x];
    }));
  }
  return v;
}
