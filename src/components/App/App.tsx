import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { useDoubleTapHandler, useSelector } from '../../hooks';
import Root from '@vkontakte/vkui/dist/components/Root/Root';

import { useRouteNode } from 'react-router5';
import { RootRoute } from '../../router';

import Epic from '../Epic';
import FoldersView from '../views/FoldersView';
import ArticlesView from '../views/ArticlesView';

const styles = makeStyles(() => ({
  root: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

/**
 * Visual entry of application
 * @type {React.NamedExoticComponent<object>}
 */
const App = () => {
  const classes = styles();
  document.body.className = classes.root;

  const onTouchStart = useDoubleTapHandler();

  // Add handler which prevents scroll after double tapping the screen
  useEffect(() => {
    const body = document.documentElement;
    body.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => body.removeEventListener('touchstart', onTouchStart);
  }, [onTouchStart]);

  const { route } = useRouteNode('');
  const activeView = route.name.split('.')[0];

  return (
    <>
      <Root activeView={activeView}>
        <FoldersView id={RootRoute.FOLDERS} />
        <ArticlesView id={RootRoute.ARTICLES} />
      </Root>
      <Epic />
    </>
  );
};

export default React.memo(App);
