import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '@overrided-vkui/overlay/Snackbar/Snackbar';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';

interface SuccessSnackbarProps extends SnackbarProps {
  text: string;
}
const styles = makeStyles({
  root: {
    paddingBottom: (props: { insets: Insets }) => `${props.insets.bottom + 52}px !important`,
  },
});

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = memo(({ text, ...snackbarProps }) => {
  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  return (
    <Snackbar {...snackbarProps} before={<Icon16Done style={{ display: 'block', color: 'var(--accent)' }} />}>
      {text}
    </Snackbar>
  );
});

export default SuccessSnackbar;
