import React from 'react';
import { Alert } from '@overrided-vkui';

interface DeleteBookmarkAlertProps {
  show: boolean;
  onClose(): void;
  onDelete(): void;
}
const DeleteBookmarkAlert: React.FC<DeleteBookmarkAlertProps> = ({ ...props }) => {
  const { show, onClose, onDelete } = props;
  return (
    <Alert
      show={show}
      onClose={onClose}
      actionsLayout="horizontal"
      actions={[
        {
          title: 'Отмена',
          autoclose: true,
          mode: 'cancel',
        },
        {
          title: 'Удалить',
          autoclose: true,
          mode: 'destructive',
          action: onDelete,
        },
      ]}
    >
      <h2>Удаление статьи</h2>
      <p>Вы уверены, что хотите удалить эту статью?</p>
    </Alert>
  );
};

export default React.memo(DeleteBookmarkAlert);
