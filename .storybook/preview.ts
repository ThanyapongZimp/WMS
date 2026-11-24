import type { Preview } from '@storybook/react-vite';
import '../src/foundations/fonts.css';
import '../build/css/variables.css';
import '../src/foundations/registers.css';
import './base.css';

const preview: Preview = {
  parameters: {
    // Block CI on any WCAG violation found by axe.
    a11y: { test: 'error' },
    layout: 'padded',
  },
  globalTypes: {
    register: {
      description: 'Device register: office web, station or PDA',
      toolbar: {
        title: 'Register',
        icon: 'mobile',
        items: [
          { value: 'office', title: 'Office' },
          { value: 'station', title: 'Station' },
          { value: 'pda', title: 'PDA' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { register: 'office' },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      root.lang = 'th';
      const register = context.globals.register ?? 'office';
      if (register === 'office') root.removeAttribute('data-register');
      else root.setAttribute('data-register', register);
      return Story();
    },
  ],
};

export default preview;
