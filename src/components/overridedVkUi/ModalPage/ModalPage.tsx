import React from 'react';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import VKModalPage, { ModalPageProps as VKModalPageProps } from '@vkontakte/vkui/dist/components/ModalPage/ModalPage';
import ModalPageHeader from '@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import c from 'classnames';
import makeStyles from '@material-ui/styles/makeStyles';

const useStyles = makeStyles({
  modal: {
    '& .ModalPageHeader__shadow': {
      zIndex: 300,
    },
    '& .ModalPage__in': {
      paddingTop: 0,
    },
    '& .ModalPage__header': {
      position: 'relative',
    },
  },
  modal_fullheight: {
    '& .ModalPage__content-in': {
      minHeight: '100%',
    },
  },
  header_shaddow_never: {
    '& .ModalPageHeader__shadow': {
      opacity: '0!important',
    },
  },

  header_shaddow_always: {
    '& .ModalPageHeader__shadow': {
      opacity: '1!important',
    },
  },
});

export type ModalPageProps = Omit<VKModalPageProps, 'header' | 'title'> & {
  title: React.ReactNode;
  left?: React.ReactNode;
  header?: React.ReactNode;
  subHeader?: React.ReactNode;
  fullHeight?: boolean;
  headerShaddow?: 'always' | 'scroll' | 'never';
};

/**
 * Переопределяет компонент ModalPage из VK UI.
 * - Добавляет параметры title, left и subHeader, используемые в шапке модального окна.
 * - Добавляет параметр fullHeight, для отображения модального окна в полную высоту независимо от содержимого
 * - Добавляет параметр headerShaddow, позволяющий настраивать отрисовку тени под шапкой
 */
const ModalPage: React.FC<ModalPageProps> = (props) => {
  const { title, fullHeight, subHeader, headerShaddow = 'scroll', left, className, ...modalProps } = props;
  const mc = useStyles();

  return (
    <VKModalPage
      header={
        <>
          <ModalPageHeader
            right={
              modalProps.onClose && (
                <PanelHeaderButton onClick={modalProps.onClose}>
                  <Icon24Dismiss />
                </PanelHeaderButton>
              )
            }
            left={left}
            className={c({
              [mc.header_shaddow_never]: headerShaddow === 'never',
              [mc.header_shaddow_always]: headerShaddow === 'always',
            })}
          >
            {title}
          </ModalPageHeader>
          {subHeader}
        </>
      }
      className={c(className, mc.modal, { [mc.modal_fullheight]: fullHeight })}
      {...modalProps}
    />
  );
};

export default ModalPage;
