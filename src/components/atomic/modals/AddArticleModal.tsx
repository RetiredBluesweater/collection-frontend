import React, { useState } from 'react';
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
  Div,
} from '@vkontakte/vkui';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';
import { Collection } from 'src/types';
import Icon24CheckCircleOn from '@vkontakte/icons/dist/24/check_circle_on';
import { ReactComponent as FolderAddSVG } from '../../../assets/folder_add.svg';
import { useActions } from 'src/hooks';
import { collectionsActions } from 'src/redux/reducers/collections';
import { ValidatedArticleModalFieldsProps } from 'src/components/panels/types/types';
import { validationArticleModalInitial, validateArticleModal } from './utils';
import { useMutation } from '@apollo/react-hooks';
import { CreateBookmarkMutation, createBookmarkMutation } from 'src/types/gql/createBookmarkMutation';
import ErrorRetrySnackbar from '../snackbars/ErrorRetrySnackbar';

interface AddArticleModalProps {
  opened: boolean;
  onClose: () => void;
  collectionId?: string;
  collections?: Collection[];
}

export interface AddArticleModalStateProps {
  title: string;
  link: string;
  collectionId: string | null;
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({ opened, onClose, collections, collectionId }) => {
  const openSnackbar = useSnackbar();
  const [foldersModalOpened, openFoldersModal, closeFoldersModal] = useQueryFlag(RootRoute.MAIN, 'foldersModal');
  const createBookmarkAction = useActions(collectionsActions.createBookmark);
  const [createBookmarkRemote, { loading }] = useMutation<CreateBookmarkMutation, CreateBookmarkMutation.Arguments>(
    createBookmarkMutation,
  );

  const [article, setArticle] = useState<AddArticleModalStateProps>({
    title: '',
    link: '',
    collectionId: '',
  });

  const [validationFields, setValidationFields] = useState<ValidatedArticleModalFieldsProps>(
    validationArticleModalInitial,
  );

  const getCollectionName = () => {
    if (article.collectionId && collections) {
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
    onClose();
  };

  const submitHandler = () => {
    const { status, newValidatedObject } = validateArticleModal(article);
    setValidationFields({ ...validationFields, ...newValidatedObject });
    if (!status) {
      return;
    }
    createBookmarkRemote({
      variables: {
        params: {
          collectionId: collectionId || article.collectionId,
          link: article.link,
          title: article.title,
        },
      },
    })
      .then(({ data }) => {
        if (data?.createBookmark) {
          createBookmarkAction(data.createBookmark);
        } else {
          openSnackbar(<ErrorRetrySnackbar text={'Не удалось создать закладку'} />);
        }
      })
      .catch((e) => {
        openSnackbar(<ErrorRetrySnackbar text={e.message} />);
      });

    onClose();
    setValidationFields(validationArticleModalInitial);
  };

  const clearHandler = () => {
    setArticle({ ...article, title: '', collectionId: '', link: '' });
    setValidationFields({
      ...validationFields,
      link: { ...validationFields.link, status: 'default' },
      title: { ...validationFields.title, status: 'default' },
    });
  };

  const isClearDisable = () => {
    if (article.link.trim().length < 1 && article.collectionId === '' && article.title.trim().length < 1) {
      return true;
    } else return false;
  };

  const foldersModal = (
    <Modal
      id="FOLDERS"
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
          {collections &&
            collections.map((collection, idx) => {
              return (
                <Cell
                  onClick={() => addToCollectionHandler(collection.id)}
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
        title="Добавить статью"
        id="ADD_ARTICLE"
        show={opened}
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
              onChange={(e) => {
                setArticle({ ...article, link: e.target.value });
                setValidationFields({ ...validationFields, link: { ...validationFields.link, status: 'default' } });
              }}
              placeholder="Вставьте ссылку"
            />
          </FormLayoutGroup>
          {collections && (
            <FormLayoutGroup
              onClick={() => {
                openFoldersModal();
              }}
              top="Папка для сохранения"
            >
              <SelectMimicry placeholder="Укажите папку">{getCollectionName()}</SelectMimicry>
            </FormLayoutGroup>
          )}
          <FormLayoutGroup
            status={validationFields.title.status}
            bottom={validationFields.title.status === 'error' && validationFields.title.text}
            top="Название статьи"
          >
            <Input
              status={validationFields.title.status}
              value={article.title}
              onChange={(e) => {
                setArticle({ ...article, title: e.target.value });
                setValidationFields({ ...validationFields, title: { ...validationFields.title, status: 'default' } });
              }}
              placeholder="Укажите название"
            />
          </FormLayoutGroup>
          <Button disabled={loading} size="xl" onClick={submitHandler}>
            {loading ? 'Добавляю...' : 'Добавить'}
          </Button>
        </FormLayout>
      </Modal>
      {foldersModal}
    </>
  );
};

export default React.memo(AddArticleModal);
