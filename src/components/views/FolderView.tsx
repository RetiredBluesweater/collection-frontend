import React from 'react';
import View, { ViewProps } from '@vkontakte/vkui/dist/components/View/View';
import { Panel } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import FolderPanel from '../panels/FolderPanel';
import { Route, State } from 'router5';

const styles = makeStyles(
  {
    root: {
      '& .Panel__in': {
        paddingBottom: (props: { insets: Insets }) => {
          return `${props.insets.bottom}px !important`;
        },
      },
    },
  },
  { classNamePrefix: 'folder' },
);

interface FolderViewProps extends Omit<ViewProps, 'activePanel'> {
  route: State;
}
const FolderView: React.FC<FolderViewProps> = ({ route, ...viewProps }) => {
  const insets = useSelector((state) => state.device.currentInsets);

  const classes = styles({ insets });

  return (
    <View {...viewProps} activePanel="folder.panel">
      <Panel className={classes.root} id="folder.panel">
        <FolderPanel route={route} />
      </Panel>
    </View>
  );
};

export default React.memo(FolderView);
