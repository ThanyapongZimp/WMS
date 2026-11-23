/**
 * Build the designer-facing token page: inline the built CSS, the register
 * modes, the semantic token list and the tenant-colour module into one file
 * that can be published as an Artifact.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { build } from 'esbuild';
import { sourceHash } from './build-artifact-hash.mjs';

const tpl = readFileSync('artifact/tokens/template.html', 'utf8');
const vars = readFileSync('build/css/variables.css', 'utf8').trim();
const registers = readFileSync('src/foundations/registers.css', 'utf8').trim();
const { tokens } = JSON.parse(readFileSync('build/agent/tokens.json', 'utf8'));

const bundle = await build({
  stdin: {
    contents: "export { deriveTenantPrimary, applyTenantPrimary } from './src/theme/tenant-primary.mjs'; export { contrastRatio } from './scripts/contrast.mjs';",
    resolveDir: process.cwd(),
    loader: 'js',
  },
  bundle: true,
  format: 'iife',
  globalName: 'TenantPrimary',
  minify: true,
  write: false,
});

const fill = (s, start, end, body) => s.replace(`${start}\n${end}`, () => `${start}\n${body}\n${end}`);
let html = fill(tpl, '/* tokens:start */', '/* tokens:end */', vars);
html = fill(html, '/* registers:start */', '/* registers:end */', registers);
html = html.replace('/*TOKENS_JSON*/[]', () => JSON.stringify(tokens).replace(/</g, '\\u003c'));
html = html.replace('/*TENANT_JS*/', () => `/* tenant-src:${sourceHash()} */\n` + bundle.outputFiles[0].text.replace(/<\/script/gi, '<\\/script'));
writeFileSync('artifact/tokens/index.html', html);
console.log(`artifact/tokens/index.html ${(html.length / 1024).toFixed(1)} KB`);
