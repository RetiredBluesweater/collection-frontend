import React, { memo, useEffect } from 'react';
import { useOverlayContext } from '../Provider/context';
import ModalPage, { ModalPageProps } from '../../ModalPage/ModalPage';
import { ModalId } from '../types';

export interface ModalProps extends Omit<ModalPageProps, 'id'> {
  show: boolean;
  id: ModalId;
}

const Modal: React.FC<ModalProps> = memo(({ show, id, ...modalPageProps }) => {
  const { updateModal, showModal, hideModal } = useOverlayContext();

  useEffect(() => {
    updateModal(id, <ModalPage id={id} {...modalPageProps} />);
  }, [updateModal, id, modalPageProps]);

  useEffect(() => {
    if (show) {
      showModal(id);
    } else {
      hideModal(id);
    }
  }, [id, show, showModal, hideModal, modalPageProps]);

  useEffect(() => () => hideModal(id), [id, hideModal]);

  return null;
});

export default Modal;
