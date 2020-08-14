import React, { memo } from 'react';
import VKSnackbar, { SnackbarProps as VKSnackbarProps } from '@vkontakte/vkui/dist/components/Snackbar/Snackbar';
import { createIterator } from '../utils';

export interface SnackbarProps extends Omit<VKSnackbarProps, 'onClose'> {
  onClose?(): void;
}

const nextSnackbarKey = createIterator('overlay-snackbar');

const Snackbar: React.FC<SnackbarProps> = memo((snackbarProps) => {
  return <VKSnackbar {...snackbarProps} key={nextSnackbarKey()} onClose={snackbarProps.onClose || (() => null)} />;
});

export default Snackbar;
