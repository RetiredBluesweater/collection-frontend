import React from 'react';
import { Alert } from '@overrided-vkui';

interface DeleteCollectionAlertProps {
  show: boolean;
  onClose(): void;
  onDelete(): void;
}
const DeleteCollectionAlert: React.FC<DeleteCollectionAlertProps> = ({ ...props }) => {
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
      <h2>Удаление папки</h2>
      <p>Вы уверены, что хотите удалить эту папку и ее содержимое?</p>
    </Alert>
  );
};

export default React.memo(DeleteCollectionAlert);
