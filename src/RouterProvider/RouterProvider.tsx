import React, { useMemo, useEffect } from 'react';
import { RootRoute } from '../router';
import { createRouter } from '../router';
import { RouterProvider as Router5Provider } from 'react-router5';
import { useSelector } from 'src/hooks';

export const RouterProvider: React.FC = ({ children }) => {
  // роут по умолчанию зависит от того, где было открыто приложение

  const defaultRoute = useMemo(() => {
    return RootRoute.FOLDERS;
  }, []);

  const invite = window.location.hash.substring(1).includes('invite');
  console.log(window.location.hash.substring(1));

  // при маунте создаем роутер
  const router = useMemo(() => createRouter(defaultRoute, invite), []); // eslint-disable-line

  // при анмаунте отключаем роутер
  useEffect(
    () => () => {
      router.stop();
    },
    [], // eslint-disable-line
  );

  return <Router5Provider router={router}>{children}</Router5Provider>;
};
