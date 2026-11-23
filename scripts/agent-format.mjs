/**
 * Style Dictionary format `wms/agent-json`: one entry per token with the CSS
 * variable, resolved value, alias target and usage rule ($description), so
 * AI agents can pick a token by intent instead of guessing.
 */
const ALIAS = /^\{([a-z0-9.-]+)\}$/;

export const agentFormat = {
  name: 'wms/agent-json',
  format: ({ dictionary }) => {
    const tokens = dictionary.allTokens.map((t) => {
      const original = t.original.$value;
      const m = typeof original === 'string' && original.match(ALIAS);
      return {
        name: t.path.join('.'),
        cssVar: `--${t.path.join('-')}`,
        value: t.$value,
        type: t.$type,
        aliasOf: m ? m[1] : null,
        usageRule: t.$description ?? '',
        tier: t.filePath.split(/[\\/]/).at(-2),
      };
    });
    return JSON.stringify({ version: '0.1.0', tokens }, null, 2) + '\n';
  },
};
