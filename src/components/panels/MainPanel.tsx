import React, { ChangeEvent, useState } from 'react';
import { PanelHeader, Button, FormLayout, FormLayoutGroup, Input } from '@vkontakte/vkui';
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
import Plug from '../atomic/Plug';

interface MainPanelProps {
  onFolderOpen(folderId: string): void;
}
const MainPanel: React.FC<MainPanelProps> = ({ onFolderOpen }) => {
  const [addFolderModalOpened, openAddFolderModal, closeAddFolderModal, replaceAddFolderModal] = useQueryFlag(
    RootRoute.MAIN,
    'addFolderModal',
  );
  const [addArticleModalOpened, openAddArticleModal, closeAddArticleModal, replaceAddArticleModal] = useQueryFlag(
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

  const [folderNameError, setFolderNameError] = useState(false);

  const [folderName, setFolderName] = useState('');

  const [search, setSearch] = useState('');

  const [searchResultsLength, setSearchResultsLength] = useState(0);

  const addFolderSubmitHandler = async () => {
    const folderNameLength = folderName.trim().length;
    if (folderNameLength >= 1 && folderNameLength <= 120) {
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
    } else {
      setFolderNameError(true);
    }
  };

  const changeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
    setFolderNameError(false);
  };

  const addFolderModal = (
    <Modal title="Название папки" show={addFolderModalOpened} id="ADD_FOLDER" onClose={closeAddFolderModal}>
      <FormLayout>
        <FormLayoutGroup
          status={folderNameError ? 'error' : undefined}
          bottom={folderNameError ? 'Длина поля должна быть не более 120 символов' : undefined}
        >
          <Input
            status={folderNameError ? 'error' : undefined}
            value={folderName}
            onChange={changeFolderName}
            placeholder="Придумайте название"
          />
        </FormLayoutGroup>

        <Button
          style={{ marginTop: 12 }}
          onClick={addFolderSubmitHandler}
          disabled={folderName.trim().length < 1 || loading}
          size="xl"
        >
          {loading ? 'Сохраняю...' : 'Сохранить'}
        </Button>
      </FormLayout>
    </Modal>
  );

  const onSearchChange = (q: string) => {
    setSearch(q);
  };

  return (
    <>
      <PanelHeader separator={false}>Мои статьи</PanelHeader>
      <BookmarksHeader
        sortEnable={collections.length > 0 || uncollected.length > 0}
        rootRoute={RootRoute.MAIN}
        resultsLength={searchResultsLength}
        onSearchChange={onSearchChange}
      />
      {collections.length < 1 && uncollected.length < 1 ? (
        <Plug
          text={
            <div>
              Здесь будут отображаться статьи, <br /> которые вы добавите
            </div>
          }
          btnText="Добавить статью"
          onClick={openAddArticleModal}
        />
      ) : (
        <BookmarksContainer
          plugContent={<div style={{ marginTop: 5 }}>По вашему запросу ничего не найдено</div>}
          onSearchResultsChange={setSearchResultsLength}
          isSearchAll={true}
          q={search}
          rootRoute={RootRoute.MAIN}
          collections={collections}
          uncollected={uncollected}
          onFolderOpen={onFolderOpen}
        />
      )}
      <AddBtn
        modalOpened={addFolderModalOpened || addArticleModalOpened}
        openAddFolderModalHandler={() => {
          setFolderName('');
          replaceAddFolderModal();
        }}
        openAddArticleModalHandler={replaceAddArticleModal}
      />
      {addFolderModal}
      <AddArticleModal collections={collections} opened={addArticleModalOpened} onClose={closeAddArticleModal} />
    </>
  );
};

export default React.memo(MainPanel);
