import React, { useState } from 'react';
import { PanelHeader, Input, Button, Div, FixedLayout, Search } from '@vkontakte/vkui';
import AddBtn from '../atomic/AddBtn';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';
import { Modal } from '@overrided-vkui';
import AddArticleModal from '../atomic/modals/AddArticleModal';
import BookmarksContainer from '../atomic/BookmarksContainer';
import BookmarksHeader from '../atomic/BookmarksHeader/BookmarksHeader';
import { collectionsActions } from 'src/redux/reducers/collections';
import { useActions, useSelector } from 'src/hooks';

const MainPanel = () => {
  const [addFolderModalOpened, openAddFolderModal, closeAddFolderModal] = useQueryFlag(
    RootRoute.MAIN,
    'addFolderModal',
  );
  const [addArticleModalOpened, openAddArticleModal, closeAddArticleModal] = useQueryFlag(
    RootRoute.MAIN,
    'addArticleModal',
  );
  const createCollectioAction = useActions(collectionsActions.createCollectiion);
  const collections = useSelector((state) => state.collections.collections);
  const uncollected = useSelector((state) => state.collections.uncollected);

  const [folderName, setFolderName] = useState('');

  const addFolderSubmitHandler = () => {
    const folderNameLength = folderName.trim().length;
    if (folderNameLength >= 1 && folderNameLength <= 50) {
      createCollectioAction({
        ownerId: 1,
        id: 1,
        description: 'SDSS',
        createdAt: new Date(),
        bookmarks: [],
        title: folderName,
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
          Сохранить
        </Button>
      </Div>
    </Modal>
  );
  return (
    <>
      <PanelHeader separator={false}>Мои статьи</PanelHeader>
      <BookmarksHeader />
      <BookmarksContainer collections={collections} uncollected={uncollected} />
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
