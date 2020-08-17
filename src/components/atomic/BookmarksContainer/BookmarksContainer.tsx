import React from 'react';
import { Div } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import BookmarkArticle from '../BookmarkArticle';

const TOP_SAFE_AREA = 50;
const BOTTOM_SAFE_AREA = 50;

const styles = makeStyles(
  {
    root: {
      paddingTop: (props: { insets: Insets }) => `${TOP_SAFE_AREA + props.insets.top}px`,
      paddingBottom: (props: { insets: Insets }) => `${BOTTOM_SAFE_AREA + props.insets.bottom}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { classNamePrefix: 'BookmarksContainer' },
);
const BookmarksContainer = () => {
  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  return (
    <Div className={classes.root}>
      <BookmarkArticle />
      <BookmarkArticle />
    </Div>
  );
};

export default React.memo(BookmarksContainer);
