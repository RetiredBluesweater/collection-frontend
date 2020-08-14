import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import { useSnackbar } from '../components/overridedVkUi/overlay/Snackbar/useSnackbar';
import ErrorRetrySnackbar from '../components/atomic/snackbars/ErrorRetrySnackbar';

type AsyncStatus = 'idle' | 'loading' | 'done' | 'error';
type RetryOption = 'snackbar' | 'alert';

type AsyncOptions = {
  retry?: RetryOption;
  retryText?: string;
};

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

type ThenArgRecursive<T> = T extends PromiseLike<infer U>
  ? { 0: ThenArgRecursive<U>; 1: U }[T extends PromiseLike<any> ? 0 : 1]
  : T;

export enum USE_ASYNC_KEY {
  LOAD,
  STATUS,
  DATA,
}

const DEFAULT_OPTIONS = {};

const useAsync = <T, F extends (...a: any) => Promise<T>>(action: F, options: AsyncOptions = DEFAULT_OPTIONS) => {
  const [{ status, data }, setState] = useState<{ status: AsyncStatus; data: T | undefined }>({
    status: 'idle',
    data: undefined,
  });

  const openSnackbar = useSnackbar();

  const load = useCallback(
    (...args: ArgumentTypes<F>) => {
      setState((prev) => ({ ...prev, status: 'loading' }));
      return action(...args).then(
        (result) => {
          setState({ status: 'done', data: result });
          return result;
        },
        (e) => {
          setState((prev) => ({ ...prev, status: 'error' }));
          if (options.retry === 'snackbar') {
            openSnackbar(
              React.createElement(ErrorRetrySnackbar, { text: options.retryText, onRetry: () => load(...args) } as any),
            );
          }
          throw e;
        },
      );
    },
    [action, openSnackbar, options],
  );

  useEffect(() => {
    setState((prev) => ({ ...prev, status: 'idle' }));
  }, [action]);

  return [load, status, data] as [
    (...args: ArgumentTypes<F>) => ReturnType<F>,
    AsyncStatus,
    ThenArgRecursive<ReturnType<F>> | undefined,
  ];
};

export default useAsync;
