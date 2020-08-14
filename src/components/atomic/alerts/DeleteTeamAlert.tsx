import React from 'react';
import { Alert } from '@overrided-vkui';

interface DeleteTeamAlertProps {
  show: boolean;
  onClose(): void;
  onDelete(): void;
}
const DeleteTeamAlert: React.FC<DeleteTeamAlertProps> = ({ ...props }) => {
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
      <h2>Удаление команды</h2>
      <p>Вы уверены, что хотите удалить команду?</p>
    </Alert>
  );
};

export default React.memo(DeleteTeamAlert);
