import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Icon28WriteSquareOutline from '@vkontakte/icons/dist/28/write_square_outline';

const styles = makeStyles(
  {
    root: {
      position: 'absolute',
      top: 'calc(100% + 20px)',
      left: 0,
      width: 250,
      background: 'rgba(249, 249, 249)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      color: '#000000',
    },
    item: {
      padding: '11px 16px',
      display: 'flex',
      justifyContent: 'space-between',
      lineHeight: '22px',
      fontSize: '17px',
      borderBottom: '0.5px solid rgba(60, 60, 67, 0.29);',
      '&:active': {
        opacity: 0.7,
        borderRadius: 10,
        background: '#dcdcdc',
      },
    },
  },
  { classNamePrefix: 'bookmark-toolbar' },
);

const onItemClick = (e: React.TouchEvent<HTMLDivElement>) => {
  console.log('hey');
};
const BookmarkToolbar = () => {
  const classes = styles();
  return (
    <div className={classes.root}>
      <div onTouchStart={(e) => onItemClick(e)} className={classes.item}>
        <div>Редактировать</div>
        <Icon28WriteSquareOutline />
      </div>
      <div className={classes.item}>
        <div>Еще что-то</div>
        <Icon28WriteSquareOutline />
      </div>
    </div>
  );
};

export default React.memo(BookmarkToolbar);
