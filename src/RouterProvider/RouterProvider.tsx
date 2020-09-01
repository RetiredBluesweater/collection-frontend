import React, { useMemo, useEffect } from 'react';
import { RootRoute } from '../router';
import { createRouter } from '../router';
import { RouterProvider as Router5Provider } from 'react-router5';
import { useStorageValue } from 'src/hooks';
import { StorageFieldEnum } from 'src/types';

export const RouterProvider: React.FC = ({ children }) => {
  // роут по умолчанию зависит от того, где было открыто приложение
  const onboardingStatus = useStorageValue(StorageFieldEnum.OnboardingCompleted)[0];

  const defaultRoute = useMemo(() => {
    if (!onboardingStatus) {
      return RootRoute.ONBOARDING;
    } else {
      return RootRoute.MAIN;
    }
  }, [onboardingStatus]);

  // при маунте создаем роутер
  const router = useMemo(() => createRouter(defaultRoute), []); // eslint-disable-line

  // при анмаунте отключаем роутер
  useEffect(
    () => () => {
      router.stop();
    },
    [], // eslint-disable-line
  );

  return <Router5Provider router={router}>{children}</Router5Provider>;
};
