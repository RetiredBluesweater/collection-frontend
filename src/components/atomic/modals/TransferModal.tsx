import React, { useState, useEffect, useMemo } from 'react';
import { Modal, useSnackbar } from '@overrided-vkui';
import { Group, List, Cell, Button, Div, FixedLayout } from '@vkontakte/vkui';
import Icon24CheckCircleOn from '@vkontakte/icons/dist/24/check_circle_on';
import { useSelector, useActions } from 'src/hooks';
import { Bookmark } from 'src/types';
import { useMutation } from '@apollo/react-hooks';
import {
  ChangeBookmarksCollectionMutation,
  changeBookmarksCollectionMutation,
} from 'src/types/gql/changeBookmarksCollectionMutation';
import { makeStyles } from '@material-ui/styles';
import { Insets } from '@vkontakte/vk-bridge';
import { collectionsActions } from 'src/redux/reducers/collections';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';
import { ApolloError } from 'apollo-client';
import SuccessSnackbar from '../snackbars/SuccessSnackbar';

const styles = makeStyles({
  button: {},
  modal: {},
  list: {
    paddingBottom: (props: { insets: Insets }) => `${props.insets.bottom + 90}px`,
  },
  fixedLayout: {
    background: 'var(--background_content)',
  },
});

interface TransferModalProps {
  opened: boolean;
  onClose: () => void;
  bookmark: Bookmark;
}

const TransferModal: React.FC<TransferModalProps> = ({ opened, onClose, bookmark }) => {
  const insets = useSelector((state) => state.device.currentInsets);
  const classes = styles({ insets });
  const collections = useSelector((state) => state.collections.collections);
  const prevCollectionId = useMemo(
    () => collections.find((collection) => collection.bookmarks.find((item) => item.id === bookmark.id))?.id,
    [bookmark],
  );

  const [newCollectionId, setNewCollectionId] = useState<string | null>(prevCollectionId);

  useEffect(() => {
    if (newCollectionId !== prevCollectionId) {
      setNewCollectionId(prevCollectionId);
    }
  }, [bookmark]);

  const openSnackbar = useSnackbar();
  const transferAction = useActions(collectionsActions.transfer);
  const [transferActionRemote, { loading }] = useMutation<
    ChangeBookmarksCollectionMutation,
    ChangeBookmarksCollectionMutation.Arguments
  >(changeBookmarksCollectionMutation);

  const onChangeCollectionIdHandler = (newCollectionId: string | null) => {
    setNewCollectionId(newCollectionId);
  };

  const onTransferHandler = () => {
    if (prevCollectionId === newCollectionId) {
      onClose();
      return;
    }
    transferActionRemote({
      variables: {
        params: {
          bookmarkId: bookmark.id,
          collectionId: newCollectionId,
        },
      },
    })
      .then(({ data }) => {
        if (data?.changeBookmarksCollection) {
          transferAction({
            bookmark: data.changeBookmarksCollection,
            collectionId: data.changeBookmarksCollection.collectionId,
          });
          openSnackbar(<SuccessSnackbar text="Заметка успешно перенесена" />);
        } else {
          openSnackbar(<ErrorRetrySnackbar text={'Не удалось переместить'} />);
        }
      })
      .catch((e: ApolloError) => {
        openSnackbar(<ErrorRetrySnackbar text={e.message} />);
      });
    onClose();
  };

  return (
    <>
      <Modal className={classes.modal} id="TRANSFER" title="Переместить в" show={opened} fullHeight onClose={onClose}>
        <Group>
          <List className={classes.list}>
            <Cell
              onClick={() => onChangeCollectionIdHandler(null)}
              asideContent={!newCollectionId ? <Icon24CheckCircleOn /> : null}
            >
              Без папки
            </Cell>

            {collections.map((collection) => {
              return (
                <Cell
                  onClick={() => {
                    onChangeCollectionIdHandler(collection.id);
                  }}
                  asideContent={newCollectionId === collection.id ? <Icon24CheckCircleOn /> : null}
                  key={collection.id}
                >
                  {collection.title}
                </Cell>
              );
            })}
          </List>
          <FixedLayout className={classes.fixedLayout} vertical="bottom">
            <Div className={classes.button}>
              <Button disabled={prevCollectionId === newCollectionId} onClick={onTransferHandler} size={'xl'}>
                {loading ? 'Перемещаю...' : 'Переместить'}
              </Button>
            </Div>
          </FixedLayout>
        </Group>
      </Modal>
    </>
  );
};

export default React.memo(TransferModal);
