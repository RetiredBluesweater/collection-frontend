import React, { useState, useCallback, useEffect, useMemo } from 'react';
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
import TransferModal from '../modals/TransferModal';

const TOP_SAFE_AREA = 88;
const BOTTOM_SAFE_AREA = 105;

const styles = makeStyles(
  {
    root: {
      paddingTop: (props: { insets: Insets }) => `${TOP_SAFE_AREA + props.insets.top}px`,
      paddingBottom: (props: { insets: Insets }) =>
        `${BOTTOM_SAFE_AREA + (props.insets.bottom >= 150 ? 0 : props.insets.bottom)}px`,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      /* minHeight: (props: { insets: Insets }) => `calc(100vh - ${252 + props.insets.bottom + props.insets.top}px)`, */
      minHeight: (props: { insets: Insets }) =>
        `calc(var(--vh, 1vh) * 100 - ${285 + props.insets.bottom + props.insets.top}px)`,
    },
  },
  { classNamePrefix: 'BookmarksContainer' },
);
const BookmarksContainer: React.FC<{
  collections?: Collection[];
  uncollected?: Bookmark[];
  rootRoute: RootRoute;
  q: string;
  onFolderOpen?(folderId: string): void;
  isSearchAll?: boolean;
}> = ({ collections, uncollected, rootRoute, q, onFolderOpen, isSearchAll = false }) => {
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
  const [transferModalOpened, openTransferModal, closeTransferModal] = useQueryFlag(rootRoute, 'transferModal');

  const editCollectionAction = useActions(collectionsActions.editCollection);

  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  const isOverlay = useSelector((state) => state.app.overlay);

  const [currentEditableCollection, setCurrentEditableCollection] = useState<Collection>();

  const [currentEditableBookmark, setCurrentEditableBookmark] = useState<Bookmark>();
  const [plug, setPlug] = useState(false);

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
    setCurrentEditableBookmark(bookmark);
    openEditArticleModal();
  }, []);

  const onOpenTransferModal = (bookmark: Bookmark) => {
    setCurrentEditableBookmark(bookmark);
    openTransferModal();
  };

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

  const allBookmarks = useMemo(() => {
    const result = collections?.map((collection) => Object.assign({}, ...collection.bookmarks));
    return result;
  }, [collections]);

  const getSortedCollections = useMemo(() => {
    if (q && collections) {
      return collections.filter((collection) => {
        return (
          collection.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
          collection.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
          collection.title.toLowerCase().includes(q.toLowerCase())
        );
      });
    } else {
      return collections;
    }
  }, [q, collections]);

  const getSortedUncollected = useMemo(() => {
    let definedUncollected: Bookmark[] | undefined = uncollected;
    if (isSearchAll && allBookmarks && allBookmarks[0]?.title && !uncollected) {
      definedUncollected = allBookmarks;
    } else if (isSearchAll && allBookmarks && allBookmarks[0]?.title && uncollected) {
      definedUncollected = [...allBookmarks, ...uncollected];
    }
    if (q && definedUncollected && definedUncollected.length > 0) {
      console.log(definedUncollected);

      const sortedUncollected = definedUncollected.filter((bookmark) => {
        return (
          bookmark.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
          bookmark.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
          bookmark.title.toLowerCase().includes(q.toLowerCase())
        );
      });
      return sortedUncollected;
    } else {
      return uncollected;
    }
  }, [q, uncollected]);

  useEffect(() => {
    if (q && (collections || uncollected)) {
      if (collections && uncollected) {
        if (getSortedCollections?.length! < 1 && getSortedUncollected?.length! < 1) {
          setPlug(true);
        } else {
          setPlug(false);
        }
      }
    }
    if (!q) {
      setPlug(false);
    }
  }, [q]);

  return (
    <>
      <Overlay enable={isOverlay} blur={true} />
      <Div className={classes.root}>
        {plug && <div style={{ marginTop: 5 }}>По вашему запросу ничего не найдено</div>}
        {collections && onFolderOpen && (
          <FoldersContainer
            onFolderOpen={onFolderOpen}
            rootRoute={rootRoute}
            onOpenEditCollectionModal={onOpenEditCollectionModal}
            collections={getSortedCollections || []}
          />
        )}
        {uncollected && (
          <UncollectedContainer
            rootRoute={rootRoute}
            onOpenEditArticleModal={onOpenEditArticlenModal}
            uncollected={getSortedUncollected || []}
            onOpenTransferModal={onOpenTransferModal}
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
      {currentEditableBookmark && (
        <TransferModal opened={transferModalOpened} onClose={closeTransferModal} bookmark={currentEditableBookmark} />
      )}
    </>
  );
};

export default React.memo(BookmarksContainer);
