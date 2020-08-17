import React from 'react';
import View, { ViewProps } from '@vkontakte/vkui/dist/components/View/View';
import { Panel } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import MainPanel from '../panels/MainPanel';

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
  { classNamePrefix: 'main' },
);
const MainView: React.FC<Omit<ViewProps, 'activePanel'>> = (viewProps) => {
  const insets = useSelector((state) => state.device.currentInsets);

  const classes = styles({ insets });

  return (
    <View {...viewProps} activePanel="main.panel">
      <Panel className={classes.root} id="main.panel">
        <MainPanel />
      </Panel>
    </View>
  );
};

export default React.memo(MainView);
