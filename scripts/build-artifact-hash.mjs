/** Hash of the sources bundled into the token artifact, so a stale page fails npm test. */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

export const BUNDLED_SOURCES = ['src/theme/tenant-primary.mjs', 'scripts/contrast.mjs'];

export function sourceHash() {
  const h = createHash('sha256');
  for (const f of BUNDLED_SOURCES) h.update(readFileSync(f));
  return h.digest('hex').slice(0, 16);
}
