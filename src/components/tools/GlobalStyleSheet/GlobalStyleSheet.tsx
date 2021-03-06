import { memo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { Theme } from '../../../theme';

import { ttCommonsDemiBold, ttCommonsMedium, ttCommonsRegular } from './fonts';

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    // Add TT Commons font family
    '@font-face': [
      {
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 400,
        src: `url("${ttCommonsRegular}") format("woff2")`,
      },
      {
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 500,
        src: `url("${ttCommonsMedium}") format("woff2")`,
      },
      {
        fontFamily: 'TT Commons',
        fontStyle: 'normal',
        fontWeight: 600,
        src: `url("${ttCommonsDemiBold}") format("woff2")`,
      },
    ],
    // Set body and #root defaults
    body: {
      overflowX: 'hidden',
      backgroundColor: theme.palette.bodyBackground,
      color: theme.palette.bodyText,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      userSelect: 'none',
      '-webkit-font-smoothing': 'antialiased',
      '-webkit-tap-highlight-color': 'transparent',
      '-webkit-text-size-adjust': '100%',
      '-webkit-overflow-scrolling': 'touch',
    },
    '.Panel__in': {
      overflowX: 'hidden',
    },
    'body, #root': {
      margin: 0,
      padding: 0,
    },
    '.Separator__in, .ModalPageHeader__shadow::after': {
      height: 0.5,
    },
    '.Search__after': {
      bottom: 0,
    },
  },
}));

/**
 * Component which controls global styles
 * @type {React.NamedExoticComponent<object>}
 */
export const GlobalStyleSheet = memo(() => {
  useStyles();
  return null;
});
