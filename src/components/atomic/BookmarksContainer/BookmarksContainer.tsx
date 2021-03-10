import React, { useState, useCallback, useEffect, useMemo, ChangeEvent } from 'react';
import { Div, Input, Button, FormLayout, FormLayoutGroup } from '@vkontakte/vkui';
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
import { sortCollections, sortBookmarks } from './utils';
import { appActions } from 'src/redux/reducers/app';

const TOP_SAFE_AREA = 88;
const BOTTOM_SAFE_AREA = 105;

const styles = makeStyles(
  {
    root: {
      paddingTop: (props: { insets: Insets; headerHeight?: number }) =>
        `${(props.headerHeight ? props.headerHeight : TOP_SAFE_AREA) + props.insets.top}px`,
      paddingBottom: (props: { insets: Insets }) =>
        `${BOTTOM_SAFE_AREA + (props.insets.bottom >= 150 ? 0 : props.insets.bottom)}px`,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { classNamePrefix: 'BookmarksContainer' },
);
const BookmarksContainer: React.FC<{
  collections?: Collection[];
  uncollected?: Bookmark[];
  rootRoute: RootRoute;
  q: string;
  onSearchResultsChange(resultLength: number): void;
  plugContent: any;
  onFolderOpen?(folderId: string): void;
  isSearchAll?: boolean;
}> = ({
  collections,
  uncollected,
  rootRoute,
  q,
  onFolderOpen,
  isSearchAll = false,
  onSearchResultsChange,
  ...props
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
  const [headerHeight, setHeaderHeight] = useState<number | undefined>(undefined);

  const [transferModalOpened, openTransferModal, closeTransferModal] = useQueryFlag(rootRoute, 'transferModal');

  const editCollectionAction = useActions(collectionsActions.editCollection);

  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets, headerHeight });
  const isOverlay = useSelector((state) => state.app.overlay);
  const sortType = useSelector((state) => state.app.sortType);

  const [folderNameError, setFolderNameError] = useState(false);

  const changeFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentEditableCollection({ ...currentEditableCollection!, title: e.target.value });
    setFolderNameError(false);
  };

  const [currentEditableCollection, setCurrentEditableCollection] = useState<Collection>();

  const [currentEditableBookmark, setCurrentEditableBookmark] = useState<Bookmark>();
  const [plug, setPlug] = useState(false);

  const editCollectionSubmit = () => {
    const folderNameLength = currentEditableCollection?.title.trim().length!;

    if (folderNameLength >= 1 && folderNameLength <= 120 && currentEditableCollection) {
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
    } else {
      setFolderNameError(true);
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

  const setOverylayAction = useActions(appActions.setOverlay);

  useEffect(() => {
    setOverylayAction(false);
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    setHeaderHeight(document.querySelector('#bookmarksHeaderRef')?.getBoundingClientRect().height);
  }, []);

  useEffect(() => {
    if (editCollectionModalOpened && !currentEditableCollection?.id) {
      closeEditCollectionModal();
    }
  }, [currentEditableCollection]);

  const editCollectionModal = (
    <Modal title="Название папки" show={editCollectionModalOpened} id="EDIT_FOLDER" onClose={closeEditCollectionModal}>
      <FormLayout>
        <FormLayoutGroup
          status={folderNameError ? 'error' : undefined}
          bottom={folderNameError ? 'Длина поля должна быть не более 120 символов' : undefined}
        >
          <Input
            status={folderNameError ? 'error' : undefined}
            value={currentEditableCollection?.title}
            onChange={changeFolderName}
            placeholder="Придумайте название"
          />
        </FormLayoutGroup>
        <Button
          style={{ marginTop: 12 }}
          onClick={editCollectionSubmit}
          disabled={currentEditableCollection?.title.trim().length! < 1 || loading}
          size="xl"
        >
          {loading ? 'Сохраняю...' : 'Сохранить'}
        </Button>
      </FormLayout>
    </Modal>
  );

  const allBookmarks: any = useMemo(() => {
    if (collections) {
      const filteredCollections = collections.filter((collection) => collection.bookmarks.length > 0);
      const result: Bookmark[] = [];
      filteredCollections?.forEach((collection) => {
        collection.bookmarks.forEach((item) => {
          result.push(item);
        });
      });
      return result ? result : null;
    } else return null;
  }, [collections]);

  const getSortedCollections = useMemo(() => {
    if (q && collections) {
      return sortCollections(
        sortType,
        collections.filter((collection) => {
          return (
            collection.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
            collection.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
            collection.title.toLowerCase().includes(q.toLowerCase())
          );
        }),
      );
    } else if (collections) {
      return sortCollections(sortType, collections);
    } else return [];
  }, [q, collections, sortType]);

  const getSortedUncollected = useMemo(() => {
    let definedUncollected: Bookmark[] | undefined = uncollected;
    if (isSearchAll && allBookmarks && !uncollected) {
      definedUncollected = allBookmarks;
    } else if (isSearchAll && allBookmarks && uncollected) {
      definedUncollected = [...allBookmarks, ...uncollected];
    }
    if (q && definedUncollected && definedUncollected.length > 0) {
      const filteredBookmarks = sortBookmarks(
        sortType,
        definedUncollected.filter((bookmark) => {
          return (
            bookmark.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
            bookmark.title.toLowerCase().substring(0, q.trim().length) === q.toLowerCase().trim() ||
            bookmark.title.toLowerCase().includes(q.toLowerCase())
          );
        }),
      );
      return sortBookmarks(sortType, filteredBookmarks);
    } else {
      return sortBookmarks(sortType, uncollected!);
    }
  }, [q, uncollected, sortType]);

  useEffect(() => {
    //Отображаем кол-во результатов
    if (q && getSortedCollections && getSortedUncollected) {
      onSearchResultsChange(getSortedCollections.length + getSortedUncollected.length);
    } else if (q && getSortedCollections && !getSortedUncollected) {
      onSearchResultsChange(getSortedCollections.length);
    } else if (q && !getSortedCollections && getSortedUncollected) {
      onSearchResultsChange(getSortedUncollected.length);
    } else {
      onSearchResultsChange(0);
    }
    //Ставим заглушку если нужно
    if (q && (collections || uncollected)) {
      if (collections && uncollected) {
        if (getSortedCollections?.length! < 1 && getSortedUncollected?.length! < 1) {
          setPlug(true);
        } else {
          setPlug(false);
        }
      } else if (collections || uncollected) {
        if (getSortedCollections?.length! < 1 || getSortedUncollected?.length! < 1) {
          setPlug(true);
        } else {
          setPlug(false);
        }
      }
    }
    if (!q) {
      setPlug(false);
    }
  }, [q, collections, uncollected]);

  return (
    <>
      <Overlay enable={isOverlay} blur={true} />
      <Div className={classes.root}>
        {plug && props.plugContent}
        {uncollected && (
          <UncollectedContainer
            isAnimations={!!!q}
            rootRoute={rootRoute}
            onOpenEditArticleModal={onOpenEditArticlenModal}
            uncollected={getSortedUncollected || []}
            onOpenTransferModal={onOpenTransferModal}
          />
        )}
        {collections && onFolderOpen && (
          <FoldersContainer
            isAnimations={!!!q}
            onFolderOpen={onFolderOpen}
            rootRoute={rootRoute}
            onOpenEditCollectionModal={onOpenEditCollectionModal}
            collections={getSortedCollections || []}
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
