import { useCallback } from 'react';
import { useRouteNode } from 'react-router5';
import useThrottle from './useThrottle';

const FLAG_DISABLE_VALUE = '';

const useQueryFlag = (routeNode: string, queryName: string, replace?: boolean) => {
  const { route, router } = useRouteNode(routeNode);

  const flagValue = useThrottle(route.params[queryName] || FLAG_DISABLE_VALUE, 250);

  const setFlagValue = useCallback(
    (value: boolean) => {
      if (value) {
        router.navigate(routeNode, { ...route.params, [queryName]: true }, { replace });
      } else {
        window.history.back();
      }
    },
    [router, route, routeNode, queryName],
  );

  return [
    flagValue !== FLAG_DISABLE_VALUE,
    useCallback(() => setFlagValue(true), [setFlagValue]),
    useCallback(() => setFlagValue(false), [setFlagValue]),
  ] as const;
};

export default useQueryFlag;
