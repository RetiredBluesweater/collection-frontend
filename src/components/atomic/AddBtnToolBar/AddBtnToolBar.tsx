import React from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { usePrevious } from 'src/hooks/usePrevious';

const styles = makeStyles(
  {
    root: {
      position: 'absolute',
      bottom: '100%',
      right: 0,
      opacity: 0,
      visibility: 'hidden',
      marginBottom: '14.64px',
      marginRight: 25,
    },
    enable: {
      animation: '$fadeIn 0.4s forwards',
      visibility: 'visible',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    disable: {
      visibility: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      animation: '$fadeOut 0.4s',
    },
    btn: {
      background: '#FFFFFF',
      boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.04), 0px 4px 32px rgba(0, 0, 0, 0.16)',
      borderRadius: 10,
      border: 'none',
      outline: 'none',
      padding: '9px 14px',
      fontSize: '14px',
      lineHeight: '18px',
      letterSpacing: '-0.154px',
      width: 144,
      '&:first-child': {
        marginBottom: 15,
        width: 135,
      },
      '&:active': {
        opacity: 0.7,
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '1%': {
        opacity: 0,
      },
      '100%': {
        visibility: 'visible',
        opacity: 1,
      },
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 1,
        visibility: 'visible',
      },
      '100%': {
        opacity: 0,
        visibility: 'hidden',
      },
    },
  },
  { classNamePrefix: 'addBtn_toolbar' },
);

const AddBtnToolBar: React.FC<{
  enable: boolean;
  openAddFolderModalHandler: () => void;
  openAddArticleModalHandler: () => void;
}> = ({ enable, openAddFolderModalHandler, openAddArticleModalHandler }) => {
  const classes = styles();
  const prevStatus = usePrevious(enable);

  return (
    <div className={clsx(classes.root, enable && classes.enable, prevStatus && !enable && classes.disable)}>
      <button onClick={openAddFolderModalHandler} className={classes.btn}>
        Добавить папку
      </button>
      <button onClick={openAddArticleModalHandler} className={classes.btn}>
        Добавить статью
      </button>
    </div>
  );
};

export default React.memo(AddBtnToolBar);
