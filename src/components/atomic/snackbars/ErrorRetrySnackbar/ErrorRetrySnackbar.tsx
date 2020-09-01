import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '../../../overridedVkUi/overlay/Snackbar/Snackbar';
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

interface ErrorRetrySnackbarProps extends SnackbarProps {
  text?: string;
  onRetry?(): void;
}

const ErrorRetrySnackbar: React.FC<ErrorRetrySnackbarProps> = memo(({ text, onRetry, ...snackbarProps }) => {
  return (
    <Snackbar
      layout="horizontal"
      action={onRetry && 'Повторить'}
      onActionClick={onRetry}
      before={<Icon28ErrorOutline fill="var(--destructive)" />}
      {...snackbarProps}
    >
      {text || 'Ошибка загрузки'}
    </Snackbar>
  );
});

export default ErrorRetrySnackbar;
