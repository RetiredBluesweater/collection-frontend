import React from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { State } from 'router5';
import { useSelector } from 'src/hooks';
import BookmarksHeader from '../atomic/BookmarksHeader/BookmarksHeader';
import BookmarksContainer from '../atomic/BookmarksHeader';
import { RootRoute } from 'src/router';

const FolderPanel: React.FC<{ route: State }> = ({ route }) => {
  const { id } = route.params;
  const collections = useSelector((state) => state.collections.collections);
  const collection = collections.find((collection) => collection.id === id);

  if (!collection) {
    return null;
  } else {
    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={() => window.history.back()} />}>{collection.title}</PanelHeader>
        <BookmarksHeader />
        <BookmarksContainer rootRoute={RootRoute.FOLDER} uncollected={collection.bookmarks} />
      </>
    );
  }
};

export default React.memo(FolderPanel);
