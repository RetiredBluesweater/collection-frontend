import React, { useState } from 'react';
import Folder from '../Folder';
import { makeStyles } from '@material-ui/styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Collection } from 'src/types';
import { RootRoute } from 'src/router';
import DeleteCollectionAlert from '../alerts/DeleteCollectionAlert';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { useMutation } from '@apollo/react-hooks';
import { deleteCollectionMutation, DeleteCollectionMutation } from 'src/types/gql/deleteCollectionMutation';
import { useSnackbar } from '@overrided-vkui';
import { useActions } from 'src/hooks';
import { collectionsActions } from 'src/redux/reducers/collections';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';

const styles = makeStyles({
  root: {
    marginTop: (props: { isHeader: boolean }) => (props.isHeader ? 52 : 0),
  },
});

const useTransitionStyles = makeStyles({
  enter: {
    opacity: 0,
  },
  enterActive: {
    opacity: 1,
    transition: 'opacity 500ms ease-in',
  },
  enterDone: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0,
    transition: 'opacity 500ms ease-in',
  },
  exitDone: {
    opacity: 0,
  },
});

interface FoldersContainerProps {
  header?: string;
  collections: Collection[];
  onOpenEditCollectionModal(collection: Collection): void;
  rootRoute: RootRoute;
  onFolderOpen(folderId: string): void;
  isAnimations?: boolean;
}
const FoldersContainer: React.FC<FoldersContainerProps> = ({
  collections,
  onOpenEditCollectionModal,
  rootRoute,
  onFolderOpen,
  isAnimations,
  ...props
}) => {
  const isHeader = !!props.header;
  const classes = styles({ isHeader });
  const animationStyles = useTransitionStyles();

  const [deleteCollectionRemote] = useMutation<DeleteCollectionMutation, DeleteCollectionMutation.Arguments>(
    deleteCollectionMutation,
  );
  const openSnackbar = useSnackbar();
  const deleteCollectionAction = useActions(collectionsActions.deleteCollection);

  const [deleteCollectionAlertOpened, openDeleteCollectionAlert, closeDeleteCollectionAlert] = useQueryFlag(
    rootRoute,
    'deleteCollectionAlert',
  );
  const [collectionId, setCollectionId] = useState('');

  const onDeleteHandler = (id: string) => {
    setCollectionId(id);
    openDeleteCollectionAlert();
  };

  const onDelete = (id: string) => {
    deleteCollectionRemote({
      variables: {
        params: { id },
      },
    })
      .then(({ data }) => {
        if (data?.deleteCollection) {
          deleteCollectionAction({ id });
        } else {
          openSnackbar(<ErrorRetrySnackbar text={'Не удалось удалить папку'} />);
        }
      })
      .catch((e) => openSnackbar(<ErrorRetrySnackbar text={e.message} />));
  };

  return (
    <div className={classes.root}>
      {isAnimations ? (
        <TransitionGroup>
          {collections.map((collection) => {
            return (
              <CSSTransition key={collection.id} timeout={500} classNames={animationStyles}>
                <Folder
                  onDelete={onDeleteHandler}
                  rootRoute={rootRoute}
                  onEdit={() => onOpenEditCollectionModal(collection)}
                  onClick={() => onFolderOpen(collection.id)}
                  bookmarks={collection.bookmarks}
                  title={collection.title}
                  id={collection.id}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      ) : (
        collections.map((collection) => (
          <Folder
            key={collection.id}
            onDelete={onDeleteHandler}
            rootRoute={rootRoute}
            onEdit={() => onOpenEditCollectionModal(collection)}
            onClick={() => onFolderOpen(collection.id)}
            bookmarks={collection.bookmarks}
            title={collection.title}
            id={collection.id}
          />
        ))
      )}
      <DeleteCollectionAlert
        show={deleteCollectionAlertOpened}
        onClose={closeDeleteCollectionAlert}
        onDelete={() => {
          onDelete(collectionId);
        }}
      />
    </div>
  );
};

export default React.memo(FoldersContainer);
