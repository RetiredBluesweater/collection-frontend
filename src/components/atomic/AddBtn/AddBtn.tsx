import React, { useState } from 'react';
import { FixedLayout } from '@vkontakte/vkui';
import { ReactComponent as PlusBtnSVG } from '../../../assets/plus_btn.svg';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import Overlay from '../Overlay';

const styles = makeStyles({
  fixedLayout: {
    zIndex: 11,
    '& .FixedLayout__in': {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '0 25px 25px 0',
    },
  },
  btn: {
    filter: 'drop-shadow(0px 0px 12px rgba(7, 30, 66, 0.3)) drop-shadow(0px 7px 10px rgba(23, 82, 149, 0.25))',
    '& .lines': {
      transition: 'all 0.4s',
      transformOrigin: 'center',
      transform: 'rotate(0deg)',
    },
  },
  btn__openMode: {
    '& .lines': {
      transform: 'rotate(45deg)',
    },
  },
});

const AddBtn = () => {
  const classes = styles();
  const [openMode, setOpenMode] = useState(false);

  const onBtnClickHandler = () => {
    setOpenMode(!openMode);
  };

  return (
    <>
      <Overlay enable={openMode} />
      <FixedLayout className={classes.fixedLayout} vertical="bottom">
        <PlusBtnSVG onClick={onBtnClickHandler} className={clsx(classes.btn, openMode && classes.btn__openMode)} />
      </FixedLayout>
    </>
  );
};

export default React.memo(AddBtn);
