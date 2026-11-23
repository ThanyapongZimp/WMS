import type { Preview } from '@storybook/react-vite';
import '../build/css/variables.css';
import './base.css';

const preview: Preview = {
  parameters: {
    // Block CI on any WCAG violation found by axe.
    a11y: { test: 'error' },
    layout: 'padded',
  },
  decorators: [
    (Story) => {
      document.documentElement.lang = 'th';
      return Story();
    },
  ],
};

export default preview;
