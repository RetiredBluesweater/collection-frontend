import React, { useState, useLayoutEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme } from 'src/theme';
import { ReactComponent as FolderSVG } from '../../../assets/folder.svg';
import Icon16Chevron from '@vkontakte/icons/dist/16/chevron';
import { usePlatform, OS } from '@vkontakte/vkui';
import { ReactComponent as EditSVG } from '../../../assets/edit.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/delete.svg';
import SwipeView from '../SwipeView';

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
      '&:active': {
        opacity: 0.7,
      },
      '&:not(:first-child)': {
        marginTop: 15,
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
      '&:active': {
        opacity: 0.7,
      },
    },
  }),
  { classNamePrefix: 'folder' },
);
const Folder = () => {
  const [contWidth, setContWidth] = useState(0);
  const classes = styles({ contWidth });
  const os = usePlatform();

  useLayoutEffect(() => {
    const PADDING = os === OS.ANDROID ? 16 : 12;
    //падинг и ширина иконок
    const INNER_PADDING = 90;
    setContWidth(window.innerWidth - (INNER_PADDING + PADDING * 2));
  }, []);

  return (
    <SwipeView
      leftContent={
        <>
          <EditSVG className={classes.swipeViewIcon} style={{ marginRight: 5 }} />
          <DeleteSVG className={classes.swipeViewIcon} />
        </>
      }
    >
      <div className={classes.root}>
        <FolderSVG style={{ marginRight: 10, minWidth: 20 }} />
        <div className={classes.contentContainer}>
          <div className={classes.folderTitle}>Тестовый текст достаточно большой чтобы не влезть</div>
          <div className={classes.contentRightContainer}>
            <span style={{ marginRight: 5 }}>47</span>
            <Icon16Chevron />
          </div>
        </div>
      </div>
    </SwipeView>
  );
};

export default React.memo(Folder);
