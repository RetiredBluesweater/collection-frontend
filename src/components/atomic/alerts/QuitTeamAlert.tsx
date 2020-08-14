import React from 'react';
import { Alert } from '@overrided-vkui';

interface QuitTeamAlertProps {
  show: boolean;
  onClose(): void;
  onTeamQuit(): void;
}
const QuitTeamAlert: React.FC<QuitTeamAlertProps> = ({ ...props }) => {
  const { show, onClose, onTeamQuit } = props;
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
          title: 'Выйти',
          autoclose: true,
          mode: 'destructive',
          action: onTeamQuit,
        },
      ]}
    >
      <h2>Выход из команды</h2>
      <p>Вы уверены, что хотите выйти из команды?</p>
    </Alert>
  );
};

export default React.memo(QuitTeamAlert);
