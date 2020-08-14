import React, { memo } from 'react';

import { makeStyles } from '@material-ui/styles';
import { ScreenSpinner } from '@vkontakte/vkui';

const useStyles = makeStyles(
  {
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  { name: 'AppLoadingView' },
);

/**
 * Вью которая отображается в случае, когда приложение загружается.
 * @type {React.NamedExoticComponent<object>}
 */
export const AppLoadingView = memo(() => {
  const mc = useStyles();

  return (
    <div className={mc.root}>
      <ScreenSpinner />
    </div>
  );
});
