import createRouter5 from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';

export enum RootRoute {
  MAIN = 'main',
  FOLDER = 'main.folder',
  ONBOARDING = 'main.onboarding',
}

export const createRouter = (defaultRoute: string) => {
  const router = createRouter5(
    [
      {
        name: RootRoute.MAIN,
        path: '/',
      },
      {
        name: RootRoute.FOLDER,
        path: '/folder/:id',
      },
      {
        name: RootRoute.ONBOARDING,
        path: '/onboarding',
      },
    ],
    { defaultRoute, queryParamsMode: 'loose' },
  );

  router.usePlugin(loggerPlugin);
  router.usePlugin(
    browserPlugin({
      useHash: true,
      base: window.location.search,
    }),
  );

  router.start();

  // fixes desktop safary first back navigation problem
  const route = router.getState();

  if (route) {
    router.navigate(defaultRoute, { ...route.params, fix: 'safari' }, { replace: true, force: true });
  }

  return router;
};
