import React from 'react';
import View, { ViewProps } from '@vkontakte/vkui/dist/components/View/View';
import { Panel } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import FoldersPanel from '../panels/FoldersPanel';

const styles = makeStyles(
  {
    root: {
      '& .Panel__in': {
        paddingBottom: (props: { insets: Insets }) => {
          return `${props.insets.bottom + 52}px !important`;
        },
      },
    },
  },
  { classNamePrefix: 'folders' },
);
const FoldersView: React.FC<Omit<ViewProps, 'activePanel'>> = (viewProps) => {
  const insets = useSelector((state) => state.device.currentInsets);

  const classes = styles({ insets });

  return (
    <View {...viewProps} activePanel="folders.panel">
      <Panel className={classes.root} id="folders.panel">
        <FoldersPanel />
      </Panel>
    </View>
  );
};

export default React.memo(FoldersView);
