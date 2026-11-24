#!/usr/bin/env node
/**
 * Static checks for Thai UI rules that axe and the token tests cannot see.
 * Used by the thai-ui-a11y-auditor skill and by `npm test`.
 *
 *   node scripts/thai-a11y-check.mjs [path ...]
 *
 * Default paths: src, .storybook, artifact/tokens/template.html.
 * Silence one line with a comment containing `thai-a11y-ignore: <reason>`.
 * Exit 1 when anything is found.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

const LINE_HEIGHT_FLOOR = 1.45;
const EXTENSIONS = new Set(['.css', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.html']);
const DEFAULT_PATHS = ['src', '.storybook', 'artifact/tokens/template.html'];

const RULES = [
  {
    id: 'word-break-all',
    re: /word-break\s*:\s*break-all/g,
    message: '`word-break: break-all` splits Thai words in the middle of a syllable',
    fix: 'Use `word-break: normal` with `overflow-wrap: break-word` (or `anywhere` for long codes)',
  },
  {
    id: 'letter-spacing',
    re: /letter-spacing\s*:\s*([^;}"']+)/g,
    test: (m) => !/^(0(px|em|rem)?|normal|inherit|initial|unset|var\(.*\))$/.test(m[1].trim()),
    message: 'letter-spacing on Thai text pulls vowels and tone marks away from their consonants',
    fix: 'Remove letter-spacing; if a Latin-only code needs it, scope it to that element and add `thai-a11y-ignore` with the reason',
  },
  {
    id: 'text-transform-upper',
    re: /text-transform\s*:\s*uppercase/g,
    message: 'uppercase does nothing for Thai and makes English labels harder to read',
    fix: 'Use sentence case in the source string and remove `text-transform: uppercase`',
  },
  {
    id: 'line-height-floor',
    re: /line-height\s*:\s*([0-9]*\.?[0-9]+)\s*(?=[;}"'!\s])/g,
    test: (m) => Number(m[1]) < LINE_HEIGHT_FLOOR,
    message: `unitless line-height below ${LINE_HEIGHT_FLOOR} clips stacked Thai vowels and tone marks`,
    fix: 'Use a typography token (`font: var(--typography-*)`) or a line-height of at least 1.45; long text uses `--typography-prose`',
  },
  {
    id: 'calendar-not-pinned',
    re: /(?:Intl\.DateTimeFormat|toLocaleDateString|toLocaleString|toLocaleTimeString)\(\s*(['"])(th[^'"]*)\1/g,
    test: (m) => !m[2].includes('-u-ca-'),
    message: 'a Thai date formatter without a calendar extension shows Buddhist-era years on some devices and Gregorian on others',
    fix: "Pin the calendar: `'th-TH-u-ca-gregory'` (WMS standard is Gregorian, DD/MM/YYYY)",
  },
];

/** Replace comments with spaces so line numbers stay correct. */
function stripComments(text, ext) {
  const blank = (s) => s.replace(/[^\n]/g, ' ');
  let out = text.replace(/\/\*[\s\S]*?\*\//g, blank);
  if (ext === '.html') out = out.replace(/<!--[\s\S]*?-->/g, blank);
  if (['.ts', '.tsx', '.js', '.jsx', '.mjs'].includes(ext)) out = out.replace(/(^|[^:'"])\/\/[^\n]*/g, (m, p) => p + blank(m.slice(p.length)));
  return out;
}

/**
 * Check one file's text. Returns findings `{ file, line, rule, message, fix }`.
 * @param {string} text
 * @param {string} file used for the extension and in findings
 */
export function checkText(text, file) {
  const ext = extname(file);
  const rawLines = text.split('\n');
  const code = stripComments(text, ext);
  const lineOf = (index) => code.slice(0, index).split('\n').length;
  const ignored = (line) => /thai-a11y-ignore\s*:/.test(rawLines[line - 1] ?? '');
  const findings = [];

  for (const rule of RULES) {
    for (const m of code.matchAll(rule.re)) {
      if (rule.test && !rule.test(m)) continue;
      const line = lineOf(m.index);
      if (ignored(line)) continue;
      findings.push({ file, line, rule: rule.id, message: rule.message, fix: rule.fix });
    }
  }

  if (ext === '.html') {
    const m = code.match(/<html(?![^>]*\blang\s*=\s*["'][a-z]{2})[^>]*>/i);
    if (m) {
      const line = lineOf(m.index);
      if (!ignored(line)) {
        findings.push({ file, line, rule: 'html-lang', message: 'the page has no `lang`, so screen readers read Thai with an English voice and line breaking uses the wrong dictionary', fix: 'Set `<html lang="th">` (or `lang="en"` on the English version)' });
      }
    }
  }

  return findings.sort((a, b) => a.line - b.line);
}

function walk(path) {
  if (!existsSync(path)) return [];
  if (statSync(path).isFile()) return EXTENSIONS.has(extname(path)) ? [path] : [];
  return readdirSync(path).flatMap((name) => (name === 'node_modules' ? [] : walk(join(path, name))));
}

export function checkPaths(paths) {
  return paths.flatMap(walk).flatMap((file) => checkText(readFileSync(file, 'utf8'), file));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const paths = process.argv.length > 2 ? process.argv.slice(2) : DEFAULT_PATHS;
  const findings = checkPaths(paths);
  for (const f of findings) console.log(`${f.file}:${f.line} ${f.rule}: ${f.message}. Fix: ${f.fix}`);
  console.log(findings.length ? `${findings.length} Thai UI finding(s)` : 'Thai UI check: no findings');
  process.exit(findings.length ? 1 : 0);
}
