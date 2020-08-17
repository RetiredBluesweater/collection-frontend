import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import SwipeView from '../SwipeView';
import { Theme } from 'src/theme';
import { ReactComponent as EditSVG } from '../../../assets/edit.svg';
import { ReactComponent as DeleteSVG } from '../../../assets/delete.svg';
import { ReactComponent as ArticleSVG } from '../../../assets/article.svg';
import { OS, usePlatform } from '@vkontakte/vkui';
import { useLongPress } from 'src/hooks/useLongPress';

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
    swipeViewCcon: {
      '&:active': {
        opacity: 0.7,
      },
    },
    articleSvg: {
      marginRight: 10,
    },
  }),
  { classNamePrefix: 'BookmarkArticle' },
);
const BookmarkArticle = () => {
  const [contWidth, setContWidth] = useState(0);
  const classes = styles({ contWidth });
  const os = usePlatform();

  useLayoutEffect(() => {
    const PADDING = os === OS.ANDROID ? 16 : 12;
    //падинг и ширина иконки
    const INNER_PADDING = 30;
    setContWidth(window.innerWidth - (PADDING + INNER_PADDING * 2));
  }, []);

  const onLongPress = () => {
    console.log('longpress is triggered');
  };

  const onClick = () => {
    console.log('click is triggered');
  };

  const defaultOptions = {
    delay: 500,
  };
  const longPressEvent = useLongPress(onLongPress, onClick, defaultOptions);
  return (
    <SwipeView
      leftContent={
        <>
          <EditSVG className={classes.swipeViewCcon} style={{ marginRight: 5 }} />
          <DeleteSVG className={classes.swipeViewCcon} />
        </>
      }
    >
      <div {...longPressEvent} className={classes.root}>
        <ArticleSVG className={classes.articleSvg} />
        <div>
          <h3 className={classes.title}>Тестовый текст достаточно большой чтобы не влезть ахахах хахах </h3>
          <span className={classes.subTitle}>22.05.2020</span>
        </div>
      </div>
    </SwipeView>
  );
};

export default React.memo(BookmarkArticle);
