import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';

const run = (input) => spawnSync('bash', ['.claude/hooks/stop-lint.sh'], {
  input: JSON.stringify(input),
  encoding: 'utf8',
  env: { ...process.env, CLAUDE_PROJECT_DIR: process.cwd(), WMS_LINT_CMD: 'false' },
});

test('blocks stop when lint fails on first attempt', () => {
  assert.equal(run({ stop_hook_active: false }).status, 2);
});

test('lets stop through when already re-prompted once', () => {
  assert.equal(run({ stop_hook_active: true }).status, 0);
});
