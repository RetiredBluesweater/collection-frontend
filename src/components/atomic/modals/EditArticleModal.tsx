import React, { useState, useEffect } from 'react';
import { Modal, useSnackbar } from '@overrided-vkui';
import {
  PanelHeaderButton,
  FormLayout,
  FormLayoutGroup,
  Input,
  SelectMimicry,
  Button,
  Group,
  List,
  Cell,
} from '@vkontakte/vkui';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';
import { Collection, Bookmark } from 'src/types';
import Icon24CheckCircleOn from '@vkontakte/icons/dist/24/check_circle_on';
import { useActions } from 'src/hooks';
import { collectionsActions } from 'src/redux/reducers/collections';
import { ValidatedArticleModalFieldsProps } from 'src/components/panels/types/types';
import { validationArticleModalInitial, validateArticleModal } from './utils';
import { useMutation } from '@apollo/react-hooks';
import { EditBookmarkMutation, editBookmarkMutation } from 'src/types/gql/editBookmarkMutation';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';

interface EditArticleModalProps {
  opened: boolean;
  onClose: () => void;
  collections: Collection[];
  rootRoute: RootRoute;
  bookmark: Bookmark;
}

export interface EditArticleModalStateProps {
  title: string;
  link: string;
  collectionId: string | null;
}

const EditArticleModal: React.FC<EditArticleModalProps> = ({ opened, onClose, collections, bookmark, rootRoute }) => {
  const [foldersModalOpened, openFoldersModal, closeFoldersModal] = useQueryFlag(rootRoute, 'editFoldersModal');

  const editArticleAction = useActions(collectionsActions.editBookmark);
  const [editBookmarkRemote, { loading }] = useMutation<EditBookmarkMutation, EditBookmarkMutation.Arguments>(
    editBookmarkMutation,
  );
  const openSnackbar = useSnackbar();

  const [article, setArticle] = useState<EditArticleModalStateProps>({
    title: bookmark?.title || '',
    link: bookmark?.link || '',
    collectionId: bookmark?.collectionId || '',
  });

  useEffect(() => {
    if (bookmark) {
      setArticle({ ...article, title: bookmark.title, link: bookmark.link, collectionId: bookmark.collectionId });
    }
  }, [bookmark]);

  const [validationFields, setValidationFields] = useState<ValidatedArticleModalFieldsProps>(
    validationArticleModalInitial,
  );

  const getCollectionName = () => {
    if (article.collectionId) {
      return collections.find((collection) => collection.id === article.collectionId)?.title;
    } else if (article.collectionId == null) {
      return 'Без папки';
    } else return '';
  };

  const addToCollectionHandler = (id: string | null) => {
    if (article.collectionId === id) {
      setArticle({ ...article, collectionId: '' });
    } else if (id === null) {
      setArticle({ ...article, collectionId: null });
    } else {
      setArticle({ ...article, collectionId: id });
    }
  };

  const submitHandler = () => {
    const { status, newValidatedObject } = validateArticleModal(article);
    setValidationFields({ ...validationFields, ...newValidatedObject });
    if (!status) {
      return;
    }
    editBookmarkRemote({
      variables: {
        params: {
          collectionId: article.collectionId,
          id: bookmark.id,
          link: article.link,
          title: article.title,
        },
      },
    })
      .then(({ data }) => {
        if (data?.editBookmark) {
          editArticleAction(data.editBookmark);
        } else {
          openSnackbar(<ErrorRetrySnackbar text={'Не удалось обновить закладку'} />);
        }
      })
      .catch((e) => openSnackbar(<ErrorRetrySnackbar text={e.message} />));

    onClose();
    setValidationFields(validationArticleModalInitial);
    clearHandler();
  };

  const clearHandler = () => {
    setArticle({ ...article, title: '', collectionId: '', link: '' });
  };

  const isClearDisable = () => {
    if (article.link.trim().length < 1 && article.collectionId === '' && article.title.trim().length < 1) {
      return true;
    } else return false;
  };

  const foldersModal = (
    <Modal
      id="EDIT_FOLDERS"
      title="Папка для сохранения"
      show={foldersModalOpened}
      fullHeight
      onClose={() => closeFoldersModal()}
    >
      <Group>
        <List>
          <Cell
            onClick={() => addToCollectionHandler(null)}
            asideContent={article.collectionId === null ? <Icon24CheckCircleOn /> : null}
          >
            Без папки
          </Cell>
          {collections.map((collection, idx) => {
            return (
              <Cell
                onClick={() => {
                  console.log('hehe');
                  addToCollectionHandler(collection.id);
                }}
                asideContent={article.collectionId === collection.id ? <Icon24CheckCircleOn /> : null}
                key={idx}
              >
                {collection.title}
              </Cell>
            );
          })}
        </List>
      </Group>
    </Modal>
  );
  return (
    <>
      <Modal
        left={
          <PanelHeaderButton disabled={isClearDisable()} onClick={clearHandler}>
            Очистить
          </PanelHeaderButton>
        }
        title="Редактировать статью"
        id="EDIT_ARTICLE"
        show={opened || foldersModalOpened}
        onClose={onClose}
      >
        <FormLayout>
          <FormLayoutGroup
            status={validationFields.link.status}
            bottom={validationFields.link.status === 'error' && validationFields.link.text}
            top="Ссылка на статью"
          >
            <Input
              status={validationFields.link.status}
              value={article.link}
              onChange={(e) => setArticle({ ...article, link: e.target.value })}
              placeholder="Вставьте ссылку"
            />
          </FormLayoutGroup>
          <FormLayoutGroup
            onClick={() => {
              openFoldersModal();
            }}
            top="Папка для сохранения"
          >
            <SelectMimicry placeholder="Укажите папку">{getCollectionName()}</SelectMimicry>
          </FormLayoutGroup>
          <FormLayoutGroup
            status={validationFields.title.status}
            bottom={validationFields.title.status === 'error' && validationFields.title.text}
            top="Название статьи"
          >
            <Input
              status={validationFields.title.status}
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              placeholder="Укажите название"
            />
          </FormLayoutGroup>
          <Button size="xl" onClick={submitHandler}>
            {loading ? 'Сохраняю...' : 'Сохранить'}
          </Button>
        </FormLayout>
      </Modal>
      {foldersModal}
    </>
  );
};

export default React.memo(EditArticleModal);
