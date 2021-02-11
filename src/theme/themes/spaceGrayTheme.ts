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
    onboarding: {
      backgroundColor: '#0e0e0e',
      borderColor: '#1c1c1d',
    },
    header: {
      background: 'var(--header_background)',
      color: 'var(--header_text)',
    },
    itemShadow: {
      bookmarkArticle: '0px 1px 10px rgba(255, 255, 255, 0.03), 0px 6px 16px 2px rgba(255, 255, 255, 0.04)',
    },
  },
};
