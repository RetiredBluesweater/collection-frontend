import React, { memo, useEffect, useMemo } from 'react';
import { useOverlayContext } from '../Provider/context';
import { createIterator } from '../utils';

export interface PopoutProps {
  show: boolean;
}

const nextPopoutId = createIterator('overlay-popout');

/**
 * Обертка для отображения Alert, ActionSheet и ScreenSpinner
 */
const Popout: React.FC<PopoutProps> = memo(({ show, children }) => {
  const { showPopout, hidePopout } = useOverlayContext();

  const id = useMemo(nextPopoutId, []);

  useEffect(() => {
    if (show) {
      showPopout(id, React.cloneElement(children as React.ReactElement, { key: id }));
    } else {
      hidePopout(id);
    }
  }, [showPopout, hidePopout, show, id, children]);

  useEffect(() => () => hidePopout(id), [id, hidePopout]);

  return null;
});

export default Popout;
