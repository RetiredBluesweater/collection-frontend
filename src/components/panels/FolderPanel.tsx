import React, { useState } from 'react';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { State } from 'router5';
import { useSelector } from 'src/hooks';
import BookmarksHeader from '../atomic/BookmarksHeader/BookmarksHeader';
import BookmarksContainer from '../atomic/BookmarksHeader';
import { RootRoute } from 'src/router';

const FolderPanel: React.FC<{ route: State; goBack(): void }> = ({ route, goBack }) => {
  const { id } = route.params;
  const collections = useSelector((state) => state.collections.collections);
  const collection = collections.find((collection) => collection.id === id);
  const [search, setSearch] = useState('');
  const [searchResultsLength, setSearchResultsLength] = useState(0);

  const onSearchChange = (q: string) => {
    setSearch(q);
  };

  if (!collection) {
    return null;
  } else {
    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={goBack} />}>{collection.title}</PanelHeader>
        <BookmarksHeader resultsLength={searchResultsLength} onSearchChange={onSearchChange} />
        <BookmarksContainer
          onSearchResultsChange={setSearchResultsLength}
          q={search}
          rootRoute={RootRoute.FOLDER}
          uncollected={collection.bookmarks}
        />
      </>
    );
  }
};

export default React.memo(FolderPanel);
