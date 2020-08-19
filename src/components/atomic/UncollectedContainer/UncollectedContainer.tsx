import React from 'react';
import { Bookmark } from 'src/types';
import { makeStyles } from '@material-ui/styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import BookmarkArticle from '../BookmarkArticle';

interface UncollectedContainerProps {
  header?: string;
  uncollected: Bookmark[];
}
const styles = makeStyles({
  root: {
    marginTop: (props: { isHeader: boolean }) => (props.isHeader ? 52 : 0),
  },
});

const useTransitionStyles = makeStyles({
  enter: {
    opacity: 0,
  },
  enterActive: {
    opacity: 1,
    transition: 'opacity 500ms ease-in',
  },
  enterDone: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
  },
  exitActive: {
    opacity: 0,
    transition: 'opacity 500ms ease-in',
  },
  exitDone: {
    opacity: 0,
  },
});

const UncollectedContainer: React.FC<UncollectedContainerProps> = ({ uncollected, ...props }) => {
  const isHeader = !!props.header;
  const classes = styles({ isHeader });
  const animationStyles = useTransitionStyles();

  return (
    <div className={classes.root}>
      <TransitionGroup>
        {uncollected.map((item, idx) => {
          return (
            <CSSTransition key={idx} timeout={500} classNames={animationStyles}>
              <BookmarkArticle id={item.id} title={item.title} createdAt={item.createdAt} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default React.memo(UncollectedContainer);
