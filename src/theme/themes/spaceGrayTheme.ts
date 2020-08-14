import { Theme } from '../types/theme';

import { themeDefaults } from './themeDefaults';

export const spaceGrayTheme: Theme = {
  ...themeDefaults,
  palette: {
    bodyBackground: '#19191a',
    bodyText: '#e1e3e6',
    text: {
      primary: '#e1e3e6',
      secondary: '#76787a',
    },
    statusBar: {
      default: {
        color: '#19191a',
        style: 'light',
      },
    },
    header: {
      background: 'var(--header_background)',
      color: 'var(--header_text)',
    },
  },
};
