import React, { useLayoutEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import SwipeView from '../SwipeView';
import { Theme } from 'src/theme';
import { ReactComponent as EditSVG } from '../../../assets/edit_big.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/delete.svg';
import { ReactComponent as ArticleSVG } from '../../../assets/article.svg';
import { OS, usePlatform } from '@vkontakte/vkui';
import { useLongPress } from 'src/hooks/useLongPress';
import { useActions } from 'src/hooks';
import { appActions } from 'src/redux/reducers/app';
import clsx from 'clsx';
import BookmarkToolbar from '../BookmarkToolbar';
import OutsideClickHandler from 'react-outside-click-handler';
import { Bookmark } from 'src/types';
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
      minHeight: 55,
      height: 55,
      marginTop: 15,
      transition: 'transform .6s var(--ios-easing)',
    },
    active: {
      '&:active': {
        opacity: 0.7,
      },
    },
    title: {
      color: '#000000',
      fontWeight: 'normal',
      fontSize: 17,
      padding: 0,
      margin: 0,
      marginBottom: '-5px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: (props: { contWidth: number }) => `${props.contWidth}px`,
    },
    subTitle: {
      fontSize: 11,
      color: '#99A2AD',
    },
    swipeViewIcon: {
      boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.03), 0px 6px 16px 2px rgba(0, 0, 0, 0.04)',
      '&:active': {
        opacity: 0.7,
      },
    },
    articleSvg: {
      marginRight: 10,
      minWidth: 17,
    },
  }),
  { classNamePrefix: 'BookmarkArticle' },
);
interface BookmarkArticleProps extends Partial<Bookmark> {
  onEdit(): void;
  rootRoute: RootRoute;
  onDelete(id: string, collectionId: string): void;
}
const BookmarkArticle: React.FC<BookmarkArticleProps> = ({
  title,
  id,
  link,
  createdAt,
  collectionId,
  onEdit,
  onDelete,
  rootRoute,
}) => {
  const [contWidth, setContWidth] = useState(0);
  const os = usePlatform();
  const setOverylayAction = useActions(appActions.setOverlay);

  const [isToolbar, setIsToolbar] = useState(false);

  const classes = styles({ contWidth });

  useLayoutEffect(() => {
    const PADDING = os === OS.ANDROID ? 16 : 12;
    //падинг и ширина иконки
    const INNER_PADDING = 50;
    setContWidth(window.innerWidth - (INNER_PADDING + PADDING * 2));
  }, []);

  const onLongPress = () => {
    console.log('longpress is triggered');
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

  const onClick = () => {
    console.log('click is triggered');
    window.open(link, '_blank');
  };

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
    onDelete(id, collectionId);
  };

  const formatedDate = (createdAt: Date) => {
    const date = new Date(createdAt);
    const localDate = date.toLocaleDateString();
    return localDate;
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
          <ArticleSVG className={classes.articleSvg} />
          <div>
            <h3 className={classes.title}>{title}</h3>
            <span className={classes.subTitle}>{formatedDate(createdAt!)}</span>
          </div>
        </div>
      </SwipeView>
    </>
  );
};

export default React.memo(BookmarkArticle);
