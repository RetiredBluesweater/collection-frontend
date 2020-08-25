import React, { useState } from 'react';
import { PanelHeader, PanelHeaderBack, Div, Button } from '@vkontakte/vkui';
import { State } from 'router5';
import { useSelector } from 'src/hooks';
import BookmarksHeader from '../atomic/BookmarksHeader/BookmarksHeader';
import BookmarksContainer from '../atomic/BookmarksHeader';
import { RootRoute } from 'src/router';
import { makeStyles } from '@material-ui/styles';

const styles = makeStyles({
  panelHeader: {
    '& .PanelHeader__content': {
      paddingRight: '91px !important',
      display: 'unset !important',
    },
    '& .PanelHeader__left': {
      flexGrow: 0,
    },
    '& .PanelHeader__content>*': {
      padding: '0 12px',
    },
    '& .PanelHeader__right': {
      /*  marginRight: 91, */
    },
  },
});
const TOP_SAFE_AREA = 88;

const FolderPanel: React.FC<{ route: State; goBack(): void }> = ({ route, goBack }) => {
  const classes = styles();
  const { id } = route.params;
  const collections = useSelector((state) => state.collections.collections);
  const collection = collections.find((collection) => collection.id === id);
  const [search, setSearch] = useState('');
  const [searchResultsLength, setSearchResultsLength] = useState(0);

  const onSearchChange = (q: string) => {
    setSearch(q);
  };

  if (!collection) {
    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={goBack} />}></PanelHeader>
        <Div>Такой папки не существует</Div>
        <Div>
          <Button size="xl" onClick={goBack}>
            Вернуться назад
          </Button>
        </Div>
      </>
    );
  } else {
    return (
      <>
        <PanelHeader className={classes.panelHeader} left={<PanelHeaderBack onClick={goBack} />}>
          {collection.title}
        </PanelHeader>
        <BookmarksHeader
          rootRoute={RootRoute.FOLDER}
          resultsLength={searchResultsLength}
          onSearchChange={onSearchChange}
        />

        <BookmarksContainer
          plugContent={
            search && searchResultsLength < 1 ? (
              <div style={{ marginTop: 5 }}>По вашему запросу ничего не найдено</div>
            ) : null
          }
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
