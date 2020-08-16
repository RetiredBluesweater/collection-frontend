import React, { memo } from 'react';
import VKModalRoot, { ModalRootProps } from '@vkontakte/vkui/dist/components/ModalRoot/ModalRoot';
import useThrottle from '../../../hooks/useThrottle';

const MODAL_APPEAR_ANIMATION_DELAY = 600;

/**
 * Переопределяет компонент ModalRoot из VK UI.
 * - Лечит баг поломки приложения при быстром переключении activeModal.
 */
const ModalRoot: React.FC<ModalRootProps> = memo(({ activeModal, ...modalRootProps }) => {
  // Меняем activeModalId на новый только после того, когда завершится анимация открытия старого
  // FIXME: https://github.com/VKCOM/VKUI/issues/482 (при быстрой смене activeModal ломается приложение)
  const throttledActiveModal = useThrottle(activeModal, MODAL_APPEAR_ANIMATION_DELAY);

  /* Рендер */

  return <VKModalRoot {...modalRootProps} activeModal={throttledActiveModal} />;
});

export default ModalRoot;
