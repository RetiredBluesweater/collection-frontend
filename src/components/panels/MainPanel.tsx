import React, { useState } from 'react';
import { PanelHeader, Input, Button, Div } from '@vkontakte/vkui';
import AddBtn from '../atomic/AddBtn';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';
import { Modal, useSnackbar } from '@overrided-vkui';
import AddArticleModal from '../atomic/modals/AddArticleModal';
import BookmarksContainer from '../atomic/BookmarksContainer';
import BookmarksHeader from '../atomic/BookmarksHeader/BookmarksHeader';
import { collectionsActions } from 'src/redux/reducers/collections';
import { useActions, useSelector } from 'src/hooks';
import { useMutation } from '@apollo/react-hooks';
import { CreateCollectionMutation, createCollectionMutation } from 'src/types/gql/createCollectionMutation';
import ErrorRetrySnackbar from '../atomic/snackbars/ErrorRetrySnackbar';

interface MainPanelProps {
  onFolderOpen(folderId: string): void;
}
const MainPanel: React.FC<MainPanelProps> = ({ onFolderOpen }) => {
  const [addFolderModalOpened, openAddFolderModal, closeAddFolderModal] = useQueryFlag(
    RootRoute.MAIN,
    'addFolderModal',
  );
  const [addArticleModalOpened, openAddArticleModal, closeAddArticleModal] = useQueryFlag(
    RootRoute.MAIN,
    'addArticleModal',
  );
  const [createCollectionRemote, { loading }] = useMutation<
    CreateCollectionMutation,
    CreateCollectionMutation.Arguments
  >(createCollectionMutation);
  const openSnackbar = useSnackbar();
  const createCollectioAction = useActions(collectionsActions.createCollectiion);
  const collections = useSelector((state) => state.collections.collections);
  const uncollected = useSelector((state) => state.collections.uncollected);

  const [folderName, setFolderName] = useState('');

  const [search, setSearch] = useState('');

  const [searchResultsLength, setSearchResultsLength] = useState(0);

  const addFolderSubmitHandler = async () => {
    const folderNameLength = folderName.trim().length;
    if (folderNameLength >= 1 && folderNameLength <= 50) {
      await createCollectionRemote({
        variables: {
          params: {
            title: folderName,
          },
        },
      })
        .then(({ data }) => {
          if (data?.createCollection) {
            createCollectioAction(data?.createCollection);
          } else {
            openSnackbar(<ErrorRetrySnackbar text={'Не удалось создать папку'} />);
          }
        })
        .catch((e) => {
          openSnackbar(<ErrorRetrySnackbar text={e.message} />);
        });

      closeAddFolderModal();
    }
  };

  const addFolderModal = (
    <Modal title="Название папки" show={addFolderModalOpened} id="ADD_FOLDER" onClose={closeAddFolderModal}>
      <Div style={{ paddingTop: 0 }}>
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          style={{ marginBottom: 12 }}
          placeholder="Придумайте название"
        />
        <Button onClick={addFolderSubmitHandler} disabled={folderName.trim().length < 1} size="xl">
          {loading ? 'Сохраняю...' : 'Сохранить'}
        </Button>
      </Div>
    </Modal>
  );

  const onSearchChange = (q: string) => {
    setSearch(q);
  };
  return (
    <>
      <PanelHeader separator={false}>Мои статьи</PanelHeader>
      <BookmarksHeader resultsLength={searchResultsLength} onSearchChange={onSearchChange} />
      <BookmarksContainer
        onSearchResultsChange={setSearchResultsLength}
        isSearchAll={true}
        q={search}
        rootRoute={RootRoute.MAIN}
        collections={collections}
        uncollected={uncollected}
        onFolderOpen={onFolderOpen}
      />
      <AddBtn
        modalOpened={addFolderModalOpened || addArticleModalOpened}
        openAddFolderModalHandler={() => {
          setFolderName('');
          openAddFolderModal();
        }}
        openAddArticleModalHandler={openAddArticleModal}
      />
      {addFolderModal}
      <AddArticleModal collections={collections} opened={addArticleModalOpened} onClose={closeAddArticleModal} />
    </>
  );
};

export default React.memo(MainPanel);
