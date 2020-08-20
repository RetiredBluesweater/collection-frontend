import React, { useState } from 'react';
import { Modal } from '@overrided-vkui';
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

interface AddArticleModalProps {
  opened: boolean;
  onClose: () => void;
  collections: Collection[];
}

export interface AddArticleModalStateProps {
  title: string;
  link: string;
  collectionId: string | null;
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({ opened, onClose, collections }) => {
  const [foldersModalOpened, openFoldersModal, closeFoldersModal] = useQueryFlag(RootRoute.MAIN, 'foldersModal');
  const createBookmarkAction = useActions(collectionsActions.createBookmark);

  const [article, setArticle] = useState<AddArticleModalStateProps>({
    title: '',
    link: '',
    collectionId: '',
  });

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
    createBookmarkAction({
      collectionId: article.collectionId,
      link: article.link,
      createdAt: new Date(),
      description: '',
      ownerId: 1,
      id: 1,
      title: article.title,
    });
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
          {collections.map((collection, idx) => {
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
            Добавить
          </Button>
        </FormLayout>
      </Modal>
      {foldersModal}
    </>
  );
};

export default React.memo(AddArticleModal);
