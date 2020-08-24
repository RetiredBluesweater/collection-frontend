import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from 'src/theme';
import { ReactComponent as FolderSVG } from '../../../assets/folder.svg';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import { usePlatform, OS } from '@vkontakte/vkui';
import { ReactComponent as EditSVG } from '../../../assets/edit_big.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/delete.svg';
import SwipeView from '../SwipeView';
import { Collection } from 'src/types';
import { useActions } from 'src/hooks';
import { appActions } from 'src/redux/reducers/app';
import { useLongPress } from 'src/hooks/useLongPress';
import OutsideClickHandler from 'react-outside-click-handler';
import BookmarkToolbar from '../BookmarkToolbar';
import clsx from 'clsx';
import { RootRoute } from 'src/router';

const styles = makeStyles(
  (theme: Theme) => ({
    root: {
      width: '100%',
      background: 'var(--white)',
      boxShadow: theme.palette.itemShadow.bookmarkArticle,
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '10px',
      borderRadius: 5,
      marginTop: 15,
      minHeight: 55,
      height: 55,
      transition: 'transform .6s var(--ios-easing)',

      '&:not(:first-child)': {
        marginTop: 15,
      },
    },
    active: {
      '&:active': {
        opacity: 0.7,
      },
    },
    folderTitle: {
      color: '#000000',
      fontSize: 17,
      lineHeight: '22px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: (props: { contWidth: number }) => `${props.contWidth}px`,
    },
    contentContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    contentRightContainer: {
      display: 'flex',
      alignItems: 'center',
      color: 'var(--content_placeholder_icon)',
    },
    swipeViewIcon: {
      boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.03), 0px 6px 16px 2px rgba(0, 0, 0, 0.04)',
      '&:active': {
        opacity: 0.7,
      },
    },
  }),
  { classNamePrefix: 'folder' },
);
interface FolderProps extends Partial<Collection> {
  onClick: any;
  onEdit(): void;
  onDelete(id: string): void;
  rootRoute: RootRoute;
}
const Folder: React.FC<FolderProps> = ({ onClick, onEdit, onDelete, rootRoute, ...props }) => {
  const { bookmarks, id, title } = props;

  const [contWidth, setContWidth] = useState(0);
  const setOverylayAction = useActions(appActions.setOverlay);

  const [isToolbar, setIsToolbar] = useState(false);

  const classes = styles({ contWidth });
  const os = usePlatform();

  useLayoutEffect(() => {
    const PADDING = os === OS.ANDROID ? 16 : 12;
    //падинг и ширина иконок
    const INNER_PADDING = 90;
    setContWidth(window.innerWidth - (INNER_PADDING + PADDING * 2));
  }, []);

  const onLongPress = () => {
    const activeNode = document.getElementsByClassName('longtap--active')[0] as HTMLElement;
    if (activeNode) {
      activeNode.style.position = 'relative';
      activeNode.style.zIndex = '100';
      setIsToolbar(true);
      setOverylayAction(true);
    }
  };

  const onLongtapViewClose = () => {
    const activeNode = document.getElementsByClassName('longtap--active')[0] as HTMLElement;
    if (activeNode) {
      activeNode.style.position = 'unset';
      activeNode.style.zIndex = 'unset';
      activeNode.classList.remove('longtap--active');
      setIsToolbar(false);
      setOverylayAction(false);
    }
  };

  /*   const onClick = () => {
    console.log('click is triggered');
  }; */

  const defaultOptions = {
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);

  const events = () => {
    const value = isToolbar ? {} : longPressEvent;
    return value;
  };

  const onOpenedDeleteAlert = () => {
    onLongtapViewClose();
    onDelete(id);
  };
  return (
    <>
      <SwipeView
        swipable={!isToolbar}
        leftContent={
          <>
            <EditSVG onClick={onEdit} className={classes.swipeViewIcon} style={{ marginRight: 5 }} />
            <DeleteSVG onClick={onOpenedDeleteAlert} className={classes.swipeViewIcon} />
          </>
        }
      >
        <div
          {...events()}
          className={clsx(classes.root, 'longtap-target', !isToolbar && classes.active, isToolbar && 'longtap--active')}
        >
          {isToolbar && (
            <OutsideClickHandler onOutsideClick={onLongtapViewClose}>
              <BookmarkToolbar
                onEdit={() => {
                  onLongtapViewClose();
                  onEdit();
                }}
                onDelete={onOpenedDeleteAlert}
              />
            </OutsideClickHandler>
          )}
          <FolderSVG style={{ marginRight: 10, minWidth: 20 }} />
          <div className={classes.contentContainer}>
            <div className={classes.folderTitle}>{title}</div>
            <div className={classes.contentRightContainer}>
              <span style={{ marginRight: 5 }}>{bookmarks?.length}</span>
              <Icon16Chevron />
            </div>
          </div>
        </div>
      </SwipeView>
    </>
  );
};

export default React.memo(Folder);
