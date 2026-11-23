import StyleDictionary from 'style-dictionary';
import { agentFormat } from './scripts/agent-format.mjs';

const out = process.env.SD_OUT ?? 'build';
const src = process.env.SD_SOURCE ?? 'tokens';

StyleDictionary.registerFormat(agentFormat);

const sd = new StyleDictionary({
  source: [`${src}/**/*.tokens.json`],
  usesDtcg: true,
  log: { verbosity: 'silent', errors: { brokenReferences: 'throw' } },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: `${out}/css/`,
      files: [{ destination: 'variables.css', format: 'css/variables', options: { outputReferences: true } }],
    },
    agent: {
      transformGroup: 'js',
      buildPath: `${out}/agent/`,
      files: [{ destination: 'tokens.json', format: 'wms/agent-json' }],
    },
  },
});

await sd.buildAllPlatforms();
