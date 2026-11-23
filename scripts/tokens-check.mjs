// Fail when committed build/ differs from a fresh build of tokens/.
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const out = mkdtempSync(join(tmpdir(), 'sd-check-'));
execFileSync('node', ['sd.config.mjs'], { env: { ...process.env, SD_OUT: out }, stdio: 'inherit' });
const diff = spawnSync('diff', ['-r', 'build', out], { encoding: 'utf8' });
if (diff.status !== 0) {
  console.error(diff.stdout || diff.stderr);
  console.error('build/ is stale. Run `npm run tokens:build` and commit the result.');
  process.exit(1);
}
console.log('build/ matches tokens/');
