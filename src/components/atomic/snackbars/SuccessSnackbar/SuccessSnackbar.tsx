import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '@overrided-vkui/overlay/Snackbar/Snackbar';
import Icon16Done from '@vkontakte/icons/dist/16/done';
import { makeStyles } from '@material-ui/styles';

interface SuccessSnackbarProps extends SnackbarProps {
  text: string;
}

const useStyles = makeStyles(
  {
    root: {
      width: 'calc(100% - 90px)',
      '& .Snackbar__in': {
        paddingBottom: 29,
      },
    },
  },
  {
    classNamePrefix: 'SuccessSnackbar',
  },
);

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = memo(({ text, ...snackbarProps }) => {
  const classes = useStyles();

  return (
    <Snackbar
      {...snackbarProps}
      className={classes.root}
      before={<Icon16Done style={{ display: 'block', color: 'var(--accent)' }} />}
    >
      {text}
    </Snackbar>
  );
});

export default SuccessSnackbar;
