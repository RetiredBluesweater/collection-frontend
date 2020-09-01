import { useCallback, useRef, useState } from 'react';

export const useLongPress = (
  onLongPress: any,
  onClick: () => void,
  { shouldPreventDefault = false, delay = 300 } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<any>();
  const target = useRef<any>();
  const data = useRef<any>();

  const getCoordinates = (e: any) => {
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;

    data.current = { ...data.current, currentX: clientX, currentY: clientY };
  };

  const start = useCallback(
    (event: any) => {
      event.persist();
      data.current = {
        startX: event.touches && event.touches[0].clientX,
        startY: event.touches && event.touches[0].clientY,
      };

      event.target.addEventListener('touchmove', getCoordinates);

      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        if (
          data.current?.currentX ||
          (data.current?.currentY && Math.abs(Math.abs(data.current?.startX) - Math.abs(data.current.currentX)) > 10) ||
          Math.abs(Math.abs(data.current?.startY) - Math.abs(data.current?.currentY)) > 10
        ) {
          setLongPressTriggered(false);
          return;
        }

        event.target.closest('.longtap-target').classList.add('longtap--active');

        onLongPress(event);

        /*   if (window.navigator?.vibrate) {
          window.navigator.vibrate(200);
        } */

        /* setLongPressTriggered(true); */
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      if (
        data.current?.currentX ||
        (data.current?.currentY && Math.abs(Math.abs(data.current?.startX) - Math.abs(data.current.currentX)) > 10) ||
        Math.abs(Math.abs(data.current?.startY) - Math.abs(data.current?.currentY)) > 10
      ) {
        return;
      }

      timeout.current && clearTimeout(timeout.current);

      shouldTriggerClick && !longPressTriggered && onClick();
      event.target.removeEventListener('touchmove', getCoordinates);

      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, onClick, longPressTriggered],
  );

  return {
    /*  onMouseDown: (e: any) => start(e), */
    onTouchStart: (e: any) => start(e),
    /*  onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false), */
    onTouchEnd: (e: any) => clear(e),
  };
};

const isTouchEvent = (event: any) => {
  return 'touches' in event;
};

const preventDefault = (event: any) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};
