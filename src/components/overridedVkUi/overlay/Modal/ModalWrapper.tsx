import React, { useEffect } from 'react';
import { withModalRootContext } from '@vkontakte/vkui';
import { ModalPageProps } from '../../ModalPage/ModalPage';
import useWindowSizes from '../../../../hooks/useWindowSizes';

interface ModalWrapperProps {
  id: string;
  settlingHeight?: number;
  dynamicContentHeight?: boolean;
}

const ModalComponentWrapper: React.FC<ModalWrapperProps & { updateModalHeight?(): void }> = ({
  updateModalHeight,
  children,
}) => {
  const windowHeight = useWindowSizes().innerHeight;

  useEffect(() => {
    if (updateModalHeight) {
      updateModalHeight();
    }
  }, [windowHeight, updateModalHeight]);

  return React.cloneElement(children as React.ReactElement, (props: ModalPageProps) => ({
    ...props,
    updateModalHeight,
  }));
};

export default withModalRootContext(ModalComponentWrapper);
