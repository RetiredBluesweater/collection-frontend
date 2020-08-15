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
    header: {
      background: '#3F8AE0',
      color: 'white',
    },
  },
};
