import React, { memo, useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { overlayContext, OverlayContext } from './context';
import Root from '@vkontakte/vkui/dist/components/Root/Root';
import ModalRoot from '../../ModalRoot/ModalRoot';
import { ModalId, modals } from '../types';
import ModalWrapper from '../Modal/ModalWrapper';

const Provider: React.FC = memo(({ children }) => {
  /* Modals */

  const [modalContents, setModalContents] = useState<{ [modalId in ModalId]?: React.ReactElement }>({});
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const onClose = useCallback(
    (modalId: ModalId) => {
      const action = modalContents[modalId]?.props.onClose();
      if (action instanceof Function) {
        action();
      }
    },
    [modalContents],
  );

  const modal = useMemo(
    () => (
      <ModalRoot activeModal={activeModal} onClose={onClose}>
        {modals.map((modalId) => (
          <ModalWrapper id={modalId} key={modalId} settlingHeight={100} dynamicContentHeight>
            {modalContents[modalId]}
          </ModalWrapper>
        ))}
      </ModalRoot>
    ),
    [activeModal, modalContents, onClose],
  );

  /* Popout */

  const [popoutStack, setPopoutStack] = useState<Array<{ id: string; component: React.ReactNode }>>([]);
  const popout = popoutStack[popoutStack.length - 1] as { id: string; component: React.ReactNode } | undefined;

  /* Snackbar  */

  const [snackbar, setSnackbar] = useState<React.ReactNode>(null);

  const contextСonstants = useMemo<Omit<OverlayContext, 'overlayOpened'>>(
    () => ({
      updateModal(modalId, content) {
        setModalContents((prev) => ({ ...prev, [modalId]: content }));
      },
      showModal(modalId) {
        setActiveModal(modalId);
      },
      hideModal(modalId) {
        setActiveModal((prev) => {
          return prev === modalId ? null : prev;
        });
      },
      showPopout(popoutId, component) {
        setPopoutStack((prev) => {
          const foundIndex = prev.findIndex((popout) => popout.id === popoutId);
          const popoutIndex = foundIndex === -1 ? prev.length : foundIndex;

          return [...prev.slice(0, popoutIndex), { id: popoutId, component }, ...prev.slice(popoutIndex + 1)];
        });
      },
      hidePopout(popoutId) {
        setPopoutStack((prev) => prev.filter((popout) => popout.id !== popoutId));
      },
      openSnackbar(element) {
        setSnackbar(
          <element.type
            {...element.props}
            onClose={() => {
              setSnackbar(null);
              element.props.onClose && element.props.onClose();
            }}
          />,
        );
      },
    }),
    [],
  );

  const overlayOpened = activeModal !== null || Boolean(popout);

  const previousPaddingRight = useRef(document.body.style.paddingRight);
  const previousBodyOverflow = useRef(document.body.style.overflow);

  useEffect(() => {
    if (overlayOpened) {
      const scrollWidth = window.innerWidth - document.body.scrollWidth;
      previousPaddingRight.current = document.body.style.paddingRight;
      document.body.style.paddingRight = `${scrollWidth}px`;
      previousBodyOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousBodyOverflow.current;
      document.body.style.paddingRight = previousPaddingRight.current;
    }
  }, [overlayOpened]);

  const context = useMemo<OverlayContext>(
    () => ({
      ...contextСonstants,
      overlayOpened,
    }),
    [contextСonstants, overlayOpened],
  );

  return (
    <overlayContext.Provider value={context}>
      <Root modal={modal} popout={popout?.component || null} activeView="overlay-root.view">
        <div style={{ height: '100%' }} id="overlay-root.view">
          {children}
          {snackbar}
        </div>
      </Root>
    </overlayContext.Provider>
  );
});

export default Provider;
