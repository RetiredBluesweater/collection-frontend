import React from 'react';
import { Div } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import BookmarkArticle from '../BookmarkArticle';
import FoldersContainer from '../FoldersContainer';
import Overlay from '../Overlay';

const TOP_SAFE_AREA = 88;
const BOTTOM_SAFE_AREA = 105;

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
  const isOverlay = useSelector((state) => state.app.overlay);
  return (
    <>
      <Overlay enable={isOverlay} blur={true} />

      <Div className={classes.root}>
        <BookmarkArticle />
        <BookmarkArticle />
        <FoldersContainer />
      </Div>
    </>
  );
};

export default React.memo(BookmarksContainer);
