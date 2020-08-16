import React from 'react';
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
} from '@vkontakte/vkui';
import useQueryFlag from 'src/hooks/useQueryFlag';
import { RootRoute } from 'src/router';

interface AddArticleModalProps {
  opened: boolean;
  onClose: () => void;
}
const AddArticleModal: React.FC<AddArticleModalProps> = ({ opened, onClose }) => {
  const [foldersModalOpened, openFoldersModal, closeFoldersModal] = useQueryFlag(RootRoute.MAIN, 'foldersModal');

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
          <Cell>test</Cell>
          <Cell>tes1</Cell>
        </List>
      </Group>
    </Modal>
  );
  return (
    <>
      <Modal
        left={<PanelHeaderButton>Очистить</PanelHeaderButton>}
        title="Добавить статью"
        id="ADD_ARTICLE"
        show={opened}
        onClose={onClose}
      >
        <FormLayout>
          <FormLayoutGroup top="Ссылка на статью">
            <Input placeholder="Вставьте ссылку" />
          </FormLayoutGroup>
          <FormLayoutGroup
            onClick={() => {
              openFoldersModal();
            }}
            top="Папка для сохранения"
          >
            <SelectMimicry placeholder="Укажите папку"></SelectMimicry>
          </FormLayoutGroup>
          <FormLayoutGroup top="Название статьи">
            <Input placeholder="Укажите название" />
          </FormLayoutGroup>
          <Button size="xl">Добавить</Button>
        </FormLayout>
      </Modal>
      {foldersModal}
    </>
  );
};

export default React.memo(AddArticleModal);
