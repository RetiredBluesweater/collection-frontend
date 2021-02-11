import { Theme } from '../types/theme';
import { themeDefaults } from './themeDefaults';

export const brightLightTheme: Theme = {
  ...themeDefaults,
  palette: {
    bodyBackground: 'white',
    bodyText: 'black',
    text: {
      primary: 'black',
      secondary: '#818c99',
    },
    statusBar: {
      default: {
        color: '#FFFFFF',
        style: 'dark',
      },
    },
    onboarding: {
      backgroundColor: 'white',
      borderColor: '#EEEEEE',
    },
    header: {
      background: '#3F8AE0',
      color: 'white',
    },
    itemShadow: {
      bookmarkArticle: '0px 1px 10px rgba(0, 0, 0, 0.03), 0px 6px 16px 2px rgba(0, 0, 0, 0.04)',
    },
  },
};
