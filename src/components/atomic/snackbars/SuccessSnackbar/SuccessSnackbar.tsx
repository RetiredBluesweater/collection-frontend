import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '@overrided-vkui/overlay/Snackbar/Snackbar';
import Icon16Done from '@vkontakte/icons/dist/16/done';

interface SuccessSnackbarProps extends SnackbarProps {
  text: string;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = memo(({ text, ...snackbarProps }) => {
  return (
    <Snackbar {...snackbarProps} before={<Icon16Done style={{ display: 'block', color: 'var(--accent)' }} />}>
      {text}
    </Snackbar>
  );
});

export default SuccessSnackbar;
