/**
 * Repo hygiene scan: no emoji anywhere we author text, and no hardcoded
 * hex / px / ms values in UI source (CSS and component TSX, comments ignored).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;
const HARDCODE = /#[0-9a-fA-F]{3,8}\b|\b\d+(?:\.\d+)?(?:px|ms)\b/;
const TEXT_EXT = new Set(['.md', '.json', '.css', '.ts', '.tsx', '.mjs', '.js', '.yml', '.html']);

function walk(p) {
  if (!existsSync(p)) return [];
  if (statSync(p).isFile()) return [p];
  return readdirSync(p).flatMap((n) => (n === 'node_modules' ? [] : walk(join(p, n))));
}

const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

/** UI source = CSS and TSX components, excluding stories (test harness). */
export const isUiSource = (f) => (extname(f) === '.css' || (extname(f) === '.tsx' && !f.endsWith('.stories.tsx')));

export function scan({ emojiPaths, uiPaths }) {
  const findings = [];
  for (const f of emojiPaths.flatMap(walk).filter((f) => TEXT_EXT.has(extname(f)))) {
    readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      if (EMOJI.test(line)) findings.push(`${f}:${i + 1}: emoji`);
    });
  }
  for (const f of uiPaths.flatMap(walk).filter(isUiSource)) {
    stripComments(readFileSync(f, 'utf8')).split('\n').forEach((line, i) => {
      const m = line.match(HARDCODE);
      if (m) findings.push(`${f}:${i + 1}: hardcoded ${m[0]} (use a token)`);
    });
  }
  return findings;
}

export const REPO_SCOPE = {
  emojiPaths: ['CLAUDE.md', 'AGENTS.md', 'README.md', 'PRODUCT.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'docs', 'src', 'tokens', '.claude/agents', '.claude/rules', '.claude/skills/ux-writing-review', '.claude/skills/thai-ui-a11y-auditor', '.storybook', 'styles/WMS'],
  uiPaths: ['src'],
};
