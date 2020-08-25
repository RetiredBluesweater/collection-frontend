import React, { useState, useEffect } from 'react';
import { FixedLayout } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactComponent as PlusBtnSVG } from '../../../assets/plus_btn.svg';
import Overlay from '../Overlay';
import OutsideClickHandler from 'react-outside-click-handler';
import AddBtnToolBar from '../AddBtnToolBar';

const styles = makeStyles({
  fixedLayout: {
    left: 'unset',
    right: 0,
    zIndex: 11,
    width: 'unset',
    '& .FixedLayout__in': {
      display: 'flex',
      justifyContent: 'flex-end',
      margin: '0 25px 25px 0',
    },
    '& .FixedLayout--bottom': {
      width: 'unset !important',
    },
  },
  btn: {
    position: 'relative',
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

const AddBtn: React.FC<{
  openAddFolderModalHandler: () => void;
  openAddArticleModalHandler: () => void;
  modalOpened: boolean;
}> = ({ openAddFolderModalHandler, openAddArticleModalHandler, modalOpened }) => {
  const classes = styles();
  const [openMode, setOpenMode] = useState(false);

  const onBtnClickHandler = () => {
    setOpenMode(!openMode);
  };

  useEffect(() => {
    if (modalOpened) {
      setOpenMode(false);
    }
  }, [modalOpened]);

  return (
    <>
      <Overlay enable={openMode} />
      <FixedLayout className={classes.fixedLayout} vertical="bottom">
        <OutsideClickHandler onOutsideClick={() => setOpenMode(false)}>
          <PlusBtnSVG onClick={onBtnClickHandler} className={clsx(classes.btn, openMode && classes.btn__openMode)} />
          <AddBtnToolBar
            openAddArticleModalHandler={() => {
              setOpenMode(false);
              openAddArticleModalHandler();
            }}
            openAddFolderModalHandler={() => {
              setOpenMode(false);
              openAddFolderModalHandler();
            }}
            enable={openMode}
          />
        </OutsideClickHandler>
      </FixedLayout>
    </>
  );
};

export default React.memo(AddBtn);
