import React, { memo, useCallback, useState } from 'react';
import makeStyles from '@material-ui/styles/makeStyles/makeStyles';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import { copyToClipboard } from '../../utils/copying';
import { ModalPage, ModalRoot } from '@overrided-vkui';
import emojiSad from '../../assets/emoji-sad.png';

import { View } from '@vkontakte/vkui';
import { Root } from '@vkontakte/vkui';
import { Button } from '@vkontakte/vkui';

interface IProps {
  onRestartClick(): void;
  error: string;
}

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  crashIcon: {
    transform: 'rotate(45deg)',
    color: 'var(--activity_indicator_tint)',
  },
  button: {
    '& + &': {
      marginTop: 10,
    },
  },
  error: {
    whiteSpace: 'pre-wrap',
  },
  header: {
    fontSize: 21,
    lineHeight: '26px',
  },
  dismissIcon: {
    color: '#818c99',
  },
});

enum AppCrashModal {
  BUTTONS = 'buttons',
  INFO = 'info',
}

/**
 * Вью которая отображается в случае, когда в приложении произошла ошибка.
 * @type {React.NamedExoticComponent<IProps>}
 */
const AppCrashedView = memo((props: IProps) => {
  const { onRestartClick, error } = props;
  const mc = useStyles(props);

  const [activeModal, setActiveModal] = useState<AppCrashModal>(AppCrashModal.BUTTONS);
  const [copying, setCopying] = useState(false);

  const onCopyClick = useCallback(() => {
    setCopying(true);
    copyToClipboard(error).finally(() => setCopying(false));
  }, [error]);

  const modal = (
    <ModalRoot activeModal={activeModal}>
      <ModalPage id={AppCrashModal.BUTTONS} title="Произошла ошибка">
        <Div>
          <Button size="xl" onClick={onRestartClick} className={mc.button}>
            Перезапустить приложение
          </Button>
          <Button size="xl" mode="secondary" onClick={() => setActiveModal(AppCrashModal.INFO)} className={mc.button}>
            Подробнее об ошибке
          </Button>
        </Div>
      </ModalPage>
      <ModalPage id={AppCrashModal.INFO} onClose={() => setActiveModal(AppCrashModal.BUTTONS)} title="Ошибка">
        <Div className={mc.error}>{error}</Div>
        <Div>
          <Button size="xl" onClick={onCopyClick} disabled={copying}>
            Скопировать в буфер обмена
          </Button>
        </Div>
      </ModalPage>
    </ModalRoot>
  );

  return (
    <Root activeView="main" modal={modal}>
      <View id="main">
        <div className={mc.root}>
          <div>
            <img alt="грустный смайлик" src={emojiSad} />
          </div>
        </div>
      </View>
    </Root>
  );
});

export default AppCrashedView;
