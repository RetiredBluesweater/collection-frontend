import { createContext, useContext, ReactNode } from 'react';
import { ModalId } from '../types';

const empty = () => null;

export interface OverlayContext {
  showModal(modalId: ModalId): void;
  updateModal(modalId: ModalId, content: React.ReactNode): void;
  hideModal(modalId: ModalId): void;

  showPopout(popoutId: string, content: React.ReactNode): void;
  hidePopout(popoutId: string): void;

  overlayOpened: boolean;

  openSnackbar(content: React.ReactElement): void;
}

export const overlayContext = createContext<OverlayContext>({
  showModal: empty,
  updateModal: empty,
  hideModal: empty,

  showPopout: empty,
  hidePopout: empty,

  openSnackbar: empty,

  overlayOpened: false,
});

export const useOverlayContext = () => useContext(overlayContext);
