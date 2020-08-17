import { useCallback, useRef, useState } from 'react';

export const useLongPress = (
  onLongPress: any,
  onClick: () => void,
  { shouldPreventDefault = true, delay = 300 } = {},
) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef<any>();
  const target = useRef<any>();
  const data = useRef<any>();

  const start = useCallback(
    (event: any) => {
      data.current = { start: event.touches && event.touches[0].clientX };
      event.target.addEventListener('touchmove', (e: any) => {
        const clientX = e.touches[0].clientX;

        data.current = { ...data.current, current: clientX };
      });

      if (shouldPreventDefault && event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false,
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        if (data.current.current && Math.abs(Math.abs(data.current.start) - Math.abs(data.current.current)) > 10) {
          setLongPressTriggered(false);
          return;
        }
        onLongPress(event);
        window.navigator.vibrate(200);
        setLongPressTriggered(true);
      }, delay);
    },
    [onLongPress, delay, shouldPreventDefault],
  );

  const clear = useCallback(
    (event, shouldTriggerClick = true) => {
      if (Math.abs(Math.abs(data.current.start) - Math.abs(data.current.current)) > 10) {
        return;
      }

      timeout.current && clearTimeout(timeout.current);
      shouldTriggerClick && !longPressTriggered && onClick();

      setLongPressTriggered(false);
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener('touchend', preventDefault);
      }
    },
    [shouldPreventDefault, longPressTriggered],
  );

  return {
    onMouseDown: (e: any) => start(e),
    onTouchStart: (e: any) => start(e),
    onMouseUp: (e: any) => clear(e),
    onMouseLeave: (e: any) => clear(e, false),
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
