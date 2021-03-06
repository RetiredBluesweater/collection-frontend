import React, { useEffect, useRef, useState, ReactElement, ReactNode } from 'react';
import { Swipeable } from 'react-swipeable';
import { OS, usePlatform } from '@vkontakte/vkui';
import OutsideClickHandler from 'react-outside-click-handler';

interface SwipeViewProps {
  leftContent: ReactElement;
  children: ReactNode;
  swipable: boolean;
  onSwiped?(status: boolean): void;
}

const SwipeView: React.FC<SwipeViewProps> = ({ children, leftContent, swipable, onSwiped }) => {
  const os = usePlatform();
  const cellMarginRight = os === OS.ANDROID ? 16 : 12;
  const activeClass = 'swipeView--active';

  const [viewHeight, setViewHeight] = useState(0);

  const leftSwipedHandler = () => {
    if (!swipable) {
      return;
    }
    onSwiped && onSwiped(true);
    const cellWidth = viewCell.current.offsetWidth;

    const nodesArr = Array.from(document.getElementsByClassName(`${activeClass}`)) as HTMLElement[];

    if (nodesArr.length > 0) {
      nodesArr.map((node) => {
        node.style.transform = `translateX(${0}px)`;
        node.classList.remove(activeClass);
      });
    }

    domElement.current.style.transform = `translateX(${(cellWidth + cellMarginRight) * -1}px)`;
    viewCell.current.style.transform = `translateX(${(cellWidth + cellMarginRight) * -1}px)`;
    domElement.current.classList.add(activeClass);
    viewCell.current.classList.add(activeClass);
  };

  const rightSwipedHandler = () => {
    onSwiped && onSwiped(false);
    domElement.current.style.transform = `translateX(${0}px)`;
    viewCell.current.style.transform = `translateX(${0}px)`;
  };

  const domElement = useRef<any>(null);
  const viewCell = useRef<any>(null);

  useEffect(() => {
    setViewHeight(domElement.current.offsetHeight);
  }, []);

  return (
    <OutsideClickHandler onOutsideClick={rightSwipedHandler}>
      <Swipeable style={{ position: 'relative' }} onSwipedLeft={leftSwipedHandler} onSwipedRight={rightSwipedHandler}>
        {React.Children.map(children, (element: any, idx) => {
          if (idx === 0) {
            return React.cloneElement(element, { ref: domElement });
          } else if (element) {
            return React.cloneElement(element);
          }
        })}
        <div
          ref={viewCell}
          style={{
            position: 'absolute',
            left: `calc(100% + ${cellMarginRight}px)`,
            height: viewHeight,
            transition: 'transform .6s var(--ios-easing)',
            display: 'flex',
            alignItems: 'center',
            bottom: 0,
            transform: 'translateX(0px)',
          }}
        >
          {leftContent}
        </div>
      </Swipeable>
    </OutsideClickHandler>
  );
};

export default React.memo(SwipeView);
