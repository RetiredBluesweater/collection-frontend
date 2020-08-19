import React from 'react';
import Folder from '../Folder';
import { makeStyles } from '@material-ui/styles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Collection } from 'src/types';

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

interface FoldersContainerProps {
  header?: string;
  collections: Collection[];
}
const FoldersContainer: React.FC<FoldersContainerProps> = ({ collections, ...props }) => {
  const isHeader = !!props.header;
  const classes = styles({ isHeader });
  const animationStyles = useTransitionStyles();
  console.log(collections);

  return (
    <div className={classes.root}>
      <TransitionGroup>
        {collections.map((collection, idx) => {
          return (
            <CSSTransition key={idx} timeout={500} classNames={animationStyles}>
              <Folder bookmarks={collection.bookmarks} title={collection.title} id={collection.id} />
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default React.memo(FoldersContainer);
