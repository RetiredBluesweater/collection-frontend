import createRouter5 from 'router5';
import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';

export enum RootRoute {
  MAIN = 'main',
  FOLDER = 'main.folder',
}

export const createRouter = (defaultRoute: string, invite: boolean) => {
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

  console.log(route);

  if (route) {
    router.navigate(route.name, { ...route.params, fix: 'safari', invite }, { force: true });
  }

  return router;
};
