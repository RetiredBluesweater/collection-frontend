import { makeStyles } from '@material-ui/styles';
import ActionSheet from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import React from 'react';
import { useSelector, useActions } from 'src/hooks';
import { OS } from 'src/types';
import { appActions } from 'src/redux/reducers/app';
import { SORT_TYPE } from '../BookmarksHeader/BookmarksHeader';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000000,
  },
});

declare global {
  interface Window {
    showServicePanel: () => void;
  }
}

interface ServicePanelProps {
  open: boolean;
  onClose(): void;
}

/**
 * Сервисная панель для каких-либо экстренных вещей. Например, когда у
 * пользователя возникает проблема связанная с тем, что у него какие-либо
 * невалидные данные в хранилище и его невозможно очистить кроме как на
 * клиентской стороне
 * @type {React.NamedExoticComponent<object>}
 */
const SortPanel: React.FC<ServicePanelProps> = ({ open, onClose }) => {
  const mc = useStyles();
  const os = useSelector((state) => state.device.os);
  const setSortTypeAction = useActions(appActions.setSortType);
  if (!open) {
    return null;
  } else
    return (
      <ActionSheet onClose={onClose} className={mc.root}>
        <ActionSheetItem
          /* autoclose */
          onClick={() => {
            onClose();
            setSortTypeAction(SORT_TYPE.DATE_NEW);
          }}
        >
          Сначала новые
        </ActionSheetItem>
        <ActionSheetItem
          /* autoclose */
          onClick={() => {
            onClose();
            setSortTypeAction(SORT_TYPE.DATE_OLD);
          }}
        >
          Сначала старые
        </ActionSheetItem>
        {os === OS.IOS && (
          <ActionSheetItem /* autoclose */ onClick={onClose} mode="cancel">
            Отменить
          </ActionSheetItem>
        )}
      </ActionSheet>
    );
};

export default React.memo(SortPanel);
