import React from 'react';
import View, { ViewProps } from '@vkontakte/vkui/dist/components/View/View';
import { Panel } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import ArticlesPanel from '../panels/ArticlesPanel';

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
  { classNamePrefix: 'articles' },
);
const ArticlesView: React.FC<Omit<ViewProps, 'activePanel'>> = (viewProps) => {
  const insets = useSelector((state) => state.device.currentInsets);

  const classes = styles({ insets });

  return (
    <View {...viewProps} activePanel="articles.panel">
      <Panel className={classes.root} id="articles.panel">
        <ArticlesPanel />
      </Panel>
    </View>
  );
};

export default React.memo(ArticlesView);
