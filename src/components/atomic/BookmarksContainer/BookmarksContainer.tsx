import React, { useState, useCallback, useEffect } from 'react';
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
import { Modal, useSnackbar } from '@overrided-vkui';
import { collectionsActions } from 'src/redux/reducers/collections';
import EditArticleModal from '../modals/EditArticleModal';
import { useMutation } from '@apollo/react-hooks';
import { EditCollectionMutation, editCollectionMutation } from 'src/types/gql/editCollectionMutation';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';

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
      /* minHeight: (props: { insets: Insets }) => `calc(100vh - ${252 + props.insets.bottom + props.insets.top}px)`, */
      minHeight: (props: { insets: Insets }) =>
        `calc(var(--vh, 1vh) * 100 - ${305 + props.insets.bottom + props.insets.top}px)`,
    },
  },
  { classNamePrefix: 'BookmarksContainer' },
);
const BookmarksContainer: React.FC<{ collections?: Collection[]; uncollected?: Bookmark[]; rootRoute: RootRoute }> = ({
  collections,
  uncollected,
  rootRoute,
}) => {
  const [editCollectionRemote, { loading }] = useMutation<EditCollectionMutation, EditCollectionMutation.Arguments>(
    editCollectionMutation,
  );
  const openSnackbar = useSnackbar();

  const [editCollectionModalOpened, openEditCollectionModal, closeEditCollectionModal] = useQueryFlag(
    rootRoute,
    'editCollectionModal',
  );
  const [editArticleModalOpened, openEditArticleModal, closeEditArticleModal] = useQueryFlag(
    rootRoute,
    'editArticleModal',
  );

  const editCollectionAction = useActions(collectionsActions.editCollection);

  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  const isOverlay = useSelector((state) => state.app.overlay);
  const sortedCollections = collections;
  const sortedUncollected = uncollected;

  const [currentEditableCollection, setCurrentEditableCollection] = useState<Collection>();

  const [currentEditableBookmark, setCurrentEditableBookmark] = useState<Bookmark>();

  const editCollectionSubmit = () => {
    const folderNameLength = currentEditableCollection?.title.trim().length!;

    if (folderNameLength >= 1 && folderNameLength <= 50 && currentEditableCollection) {
      editCollectionRemote({
        variables: {
          params: {
            id: currentEditableCollection.id,
            title: currentEditableCollection.title,
          },
        },
      })
        .then(({ data }) => {
          if (data?.editCollection) {
            editCollectionAction(data.editCollection);
          } else {
            openSnackbar(<ErrorRetrySnackbar text={'Не удалось обновить папку'} />);
          }
        })
        .catch((e) => openSnackbar(<ErrorRetrySnackbar text={e.message} />));

      closeEditCollectionModal();
    }
  };

  const onOpenEditCollectionModal = (collection: Collection) => {
    setCurrentEditableCollection(collection);
    openEditCollectionModal();
  };

  const onOpenEditArticlenModal = useCallback((bookmark: Bookmark) => {
    setCurrentEditableBookmark({ ...currentEditableBookmark, ...bookmark });
    openEditArticleModal();
  }, []);

  useEffect(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  const editCollectionModal = (
    <Modal title="Название папки" show={editCollectionModalOpened} id="EDIT_FOLDER" onClose={closeEditCollectionModal}>
      <Div style={{ paddingTop: 0 }}>
        <Input
          value={currentEditableCollection?.title}
          onChange={(e) => setCurrentEditableCollection({ ...currentEditableCollection!, title: e.target.value })}
          style={{ marginBottom: 12 }}
          placeholder="Придумайте название"
        />
        <Button onClick={editCollectionSubmit} disabled={currentEditableCollection?.title.trim().length! < 1} size="xl">
          {loading ? 'Сохраняю...' : 'Сохранить'}
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
            rootRoute={rootRoute}
            onOpenEditCollectionModal={onOpenEditCollectionModal}
            collections={sortedCollections || []}
          />
        )}
        {uncollected && (
          <UncollectedContainer
            rootRoute={rootRoute}
            onOpenEditArticleModal={onOpenEditArticlenModal}
            uncollected={sortedUncollected || []}
          />
        )}
      </Div>
      {editCollectionModal}

      <EditArticleModal
        opened={editArticleModalOpened}
        onClose={closeEditArticleModal}
        rootRoute={rootRoute}
        bookmark={currentEditableBookmark!}
      />
    </>
  );
};

export default React.memo(BookmarksContainer);
