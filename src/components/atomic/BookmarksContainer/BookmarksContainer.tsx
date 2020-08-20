import React, { useState } from 'react';
import { Div, Input, Button } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useActions } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import FoldersContainer from '../FoldersContainer';
import Overlay from '../Overlay';
import { Collection, Bookmark } from 'src/types';
import UncollectedContainer from '../UncollectedContainer';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';
import { Modal } from '@overrided-vkui';
import { collectionsActions } from 'src/redux/reducers/collections';

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
      minHeight: `calc(100vh - ${252}px)`,
    },
  },
  { classNamePrefix: 'BookmarksContainer' },
);
const BookmarksContainer: React.FC<{ collections?: Collection[]; uncollected?: Bookmark[]; rootRoute: RootRoute }> = ({
  collections,
  uncollected,
  rootRoute,
}) => {
  const [editCollectionModalOpened, openEditCollectionModal, closeEditCollectionModal] = useQueryFlag(
    rootRoute,
    'editArticleModal',
  );
  const editCollectionAction = useActions(collectionsActions.editCollection);

  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  const isOverlay = useSelector((state) => state.app.overlay);
  const sortedCollections = collections;
  const sortedUncollected = uncollected;

  const [collectionName, setCollectionName] = useState('');

  const editCollectionSubmit = () => {
    const folderNameLength = collectionName.trim().length;
    if (folderNameLength >= 1 && folderNameLength <= 50) {
      editCollectionAction({
        ownerId: 1,
        id: 1,
        description: 'SDSS',
        createdAt: new Date(),
        bookmarks: [],
        title: collectionName,
      });
      closeEditCollectionModal();
    }
  };

  const onOpenEditCollectionModal = (collection: Collection) => {
    setCollectionName(collection.title);
    openEditCollectionModal();
  };

  const editArticleModal = (
    <Modal title="Название папки" show={editCollectionModalOpened} id="EDIT_FOLDER" onClose={closeEditCollectionModal}>
      <Div style={{ paddingTop: 0 }}>
        <Input
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          style={{ marginBottom: 12 }}
          placeholder="Придумайте название"
        />
        <Button onClick={editCollectionSubmit} disabled={collectionName.trim().length < 1} size="xl">
          Сохранить
        </Button>
      </Div>
    </Modal>
  );
  return (
    <>
      <Overlay enable={isOverlay} blur={true} />
      <Div className={classes.root}>
        {collections && (
          <FoldersContainer
            onOpenEditCollectionModal={onOpenEditCollectionModal}
            collections={sortedCollections || []}
          />
        )}
        {uncollected && <UncollectedContainer uncollected={sortedUncollected || []} />}
      </Div>
      {editArticleModal}
    </>
  );
};

export default React.memo(BookmarksContainer);
