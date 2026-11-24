import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import agent from '../../build/agent/tokens.json';

type AgentToken = { name: string; cssVar: string; value: unknown; type: string; usageRule: string; tier: string };
const tokens = (agent as { tokens: AgentToken[] }).tokens.filter((t) => t.tier === 'semantic');

function Swatches() {
  return (
    <table className="wms-token-table">
      <caption>Semantic colour tokens</caption>
      <thead>
        <tr><th scope="col">Swatch</th><th scope="col">Token</th><th scope="col">Value</th><th scope="col">Use</th></tr>
      </thead>
      <tbody>
        {tokens.filter((t) => t.type === 'color').map((t) => (
          <tr key={t.name}>
            <td><span className="wms-token-swatch" style={{ background: `var(${t.cssVar})` }} aria-hidden="true" /></td>
            <td><code>{t.cssVar}</code></td>
            <td><code>{String(t.value)}</code></td>
            <td>{t.usageRule}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TypeRamp() {
  return (
    <div className="wms-token-ramp">
      {tokens.filter((t) => t.type === 'typography').map((t) => (
        <section key={t.name} aria-label={t.cssVar}>
          <p className="wms-token-meta"><code>{t.cssVar}</code> {t.usageRule}</p>
          <p style={{ font: `var(${t.cssVar})` }}>สแกนช่องเก็บสินค้า A-03-12 แล้วหยิบสินค้า 1,250 ชิ้น</p>
        </section>
      ))}
    </div>
  );
}

const meta = { title: 'Foundations/Tokens' } satisfies Meta;
export default meta;

export const Colors: StoryObj = { render: () => <Swatches /> };
export const Typography: StoryObj = {
  render: () => <TypeRamp />,
  play: async () => {
    // The project must ship its own fonts; a font installed on the test machine does not count.
    for (const [family, weight] of [['IBM Plex Sans Thai', 400], ['IBM Plex Sans Thai', 600], ['IBM Plex Mono', 500]] as const) {
      const faces = await document.fonts.load(`${weight} 16px "${family}"`, family.includes('Thai') ? 'ก' : 'A');
      await expect(faces.length, `${family} ${weight} has no @font-face`).toBeGreaterThan(0);
    }
  },
};
