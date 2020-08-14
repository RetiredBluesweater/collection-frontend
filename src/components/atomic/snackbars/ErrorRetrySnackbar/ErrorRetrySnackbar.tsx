import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '../../../overridedVkUi/overlay/Snackbar/Snackbar';
import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';
import { makeStyles } from '@material-ui/styles';
import { Insets } from '@vkontakte/vk-bridge';
import { useSelector } from 'src/hooks';

interface ErrorRetrySnackbarProps extends SnackbarProps {
  text?: string;
  onRetry?(): void;
}

const styles = makeStyles({
  root: {
    paddingBottom: (props: { insets: Insets }) => `${props.insets.bottom + 52}px !important`,
  },
});

const ErrorRetrySnackbar: React.FC<ErrorRetrySnackbarProps> = memo(({ text, onRetry, ...snackbarProps }) => {
  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  return (
    <Snackbar
      className={classes.root}
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
