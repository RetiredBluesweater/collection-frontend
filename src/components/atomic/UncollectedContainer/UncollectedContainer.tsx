import React, { useState } from 'react';
import { Bookmark } from 'src/types';
import { makeStyles } from '@material-ui/styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BookmarkArticle from '../BookmarkArticle';
import { RootRoute } from 'src/router';
import DeleteBookmarkAlert from '../alerts/DeleteBookmarkAlert';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { useSnackbar } from '@overrided-vkui';
import { useMutation } from '@apollo/react-hooks';
import { DeleteBookmarkMutation, deleteBookmarkMutation } from 'src/types/gql/deleteBookmarkMutation';
import { useActions } from 'src/hooks';
import { collectionsActions } from 'src/redux/reducers/collections';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';

interface UncollectedContainerProps {
  header?: string;
  uncollected: Bookmark[];
  onOpenEditArticleModal(bookmark: Bookmark): void;
  rootRoute: RootRoute;
}
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

const UncollectedContainer: React.FC<UncollectedContainerProps> = ({
  uncollected,
  onOpenEditArticleModal,
  rootRoute,
  ...props
}) => {
  const isHeader = !!props.header;
  const classes = styles({ isHeader });
  const animationStyles = useTransitionStyles();

  const openSnackbar = useSnackbar();
  const [deleteBookmarkRemote] = useMutation<DeleteBookmarkMutation, DeleteBookmarkMutation.Arguments>(
    deleteBookmarkMutation,
  );
  const deleteBookmarkAction = useActions(collectionsActions.deleteBookmark);

  const [deleteBookmarkAlertOpened, openDeleteBookmarkAlert, closeDeleteBookmarkAlert] = useQueryFlag(
    rootRoute,
    'deleteBookmarkAlert',
  );
  const [bookmarkDeleteInfo, setBookmarkDeleteInfo] = useState<{ id: string; collectionId: string }>({
    id: '',
    collectionId: '',
  });

  const onDeleteHandler = (id: string, collectionId: string) => {
    setBookmarkDeleteInfo({ id, collectionId });
    openDeleteBookmarkAlert();
  };

  const onDelete = (id: string, collectionId: string) => {
    deleteBookmarkRemote({
      variables: {
        params: {
          id,
        },
      },
    })
      .then(({ data }) => {
        if (data?.deleteBookmark) {
          deleteBookmarkAction({ id, collectionId });
        } else {
          openSnackbar(<ErrorRetrySnackbar text={'Не удалось удалить закладку'} />);
        }
      })
      .catch((e) => openSnackbar(<ErrorRetrySnackbar text={e.message} />));
  };

  return (
    <div className={classes.root}>
      <TransitionGroup>
        {uncollected.map((item) => {
          return (
            <CSSTransition key={item.id} timeout={500} classNames={animationStyles}>
              <BookmarkArticle
                onDelete={onDeleteHandler}
                rootRoute={rootRoute}
                onEdit={() => onOpenEditArticleModal(item)}
                id={item.id}
                title={item.title}
                createdAt={item.createdAt}
                collectionId={item.collectionId}
                link={item.link}
              />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
      <DeleteBookmarkAlert
        onClose={closeDeleteBookmarkAlert}
        show={deleteBookmarkAlertOpened}
        onDelete={() => onDelete(bookmarkDeleteInfo.id, bookmarkDeleteInfo.collectionId)}
      />
    </div>
  );
};

export default React.memo(UncollectedContainer);
