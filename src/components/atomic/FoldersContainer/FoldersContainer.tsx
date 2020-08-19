import React from 'react';
import Folder from '../Folder';
import { makeStyles } from '@material-ui/styles';
import { TransitionGroup } from 'react-transition-group';

const styles = makeStyles({
  root: {
    marginTop: (props: { isHeader: boolean }) => (props.isHeader ? 52 : 0),
  },
});

interface FoldersContainerProps {
  header?: string;
}
const FoldersContainer: React.FC<FoldersContainerProps> = ({ ...props }) => {
  const isHeader = !!props.header;
  const classes = styles({ isHeader });
  return (
    <div className={classes.root}>
      <TransitionGroup>
        <Folder />
        <Folder />
      </TransitionGroup>
    </div>
  );
};

export default React.memo(FoldersContainer);
