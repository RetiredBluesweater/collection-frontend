import React from 'react';
import { FixedLayout } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ReactComponent as PlusBtnSVG } from '../../../assets/plus_btn.svg';
import Overlay from '../Overlay';
import OutsideClickHandler from 'react-outside-click-handler';
import AddBtnToolBar from '../AddBtnToolBar';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';

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
  modalOpened: boolean;
  openAddFolderModalHandler?: () => void;
  openAddArticleModalHandler?: () => void;
}> = ({ openAddFolderModalHandler, openAddArticleModalHandler, modalOpened }) => {
  const classes = styles();
  const [choiseModeOpened, openChoiseMode, closeChoiseMode] = useQueryFlag(RootRoute.MAIN, 'choseMode');

  const onBtnClickHandler = () => {
    if (!openAddFolderModalHandler && openAddArticleModalHandler) {
      openAddArticleModalHandler();
      return;
    }

    choiseModeOpened ? closeChoiseMode() : openChoiseMode();
  };

  return (
    <>
      <Overlay enable={choiseModeOpened} />
      <FixedLayout className={classes.fixedLayout} vertical="bottom">
        <OutsideClickHandler onOutsideClick={() => choiseModeOpened && closeChoiseMode()}>
          <PlusBtnSVG
            onClick={onBtnClickHandler}
            className={clsx(classes.btn, choiseModeOpened && classes.btn__openMode)}
          />
          {openAddFolderModalHandler && (
            <AddBtnToolBar
              openAddArticleModalHandler={
                openAddArticleModalHandler
                  ? () => {
                      openAddArticleModalHandler();
                    }
                  : undefined
              }
              openAddFolderModalHandler={
                openAddFolderModalHandler
                  ? () => {
                      openAddFolderModalHandler();
                    }
                  : undefined
              }
              enable={choiseModeOpened}
            />
          )}
        </OutsideClickHandler>
      </FixedLayout>
    </>
  );
};

export default React.memo(AddBtn);
