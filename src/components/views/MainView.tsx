import React, { useState, useCallback } from 'react';
import View, { ViewProps } from '@vkontakte/vkui/dist/components/View/View';
import { Panel } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';
import MainPanel from '../panels/MainPanel';
import FolderPanel from '../panels/FolderPanel';
import { State } from 'router5';
import { useRouteNode } from 'react-router5';
import { RootRoute } from 'src/router';
import OnboardingPanel from '../panels/OnboardingPanel';

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
interface MainViewProps extends Omit<ViewProps, 'activePanel'> {
  route: State;
}
const MainView: React.FC<MainViewProps> = ({ route: rootRoute, ...viewProps }) => {
  const insets = useSelector((state) => state.device.currentInsets);
  const { route, router } = useRouteNode(RootRoute.MAIN);
  const { actionSheet, overlay } = useSelector((state) => state.app);

  const activePanel = route.name;

  const classes = styles({ insets });

  /* IOS Swipe back */

  const [history, setHistory] = useState<string[]>([activePanel]);

  const openFolder = useCallback(
    (folderId: string) => {
      setHistory((prev) => prev.concat(RootRoute.FOLDER));
      router.navigate(RootRoute.FOLDER, { id: folderId });
    },
    [router],
  );

  const goHistoryBack = useCallback(() => {
    setHistory((prev) => prev.slice(0, -1));
    window.history.back();
  }, []);

  return (
    <View
      {...viewProps}
      activePanel={activePanel}
      onSwipeBack={goHistoryBack}
      history={actionSheet.status || overlay ? [] : history}
    >
      <Panel className={classes.root} id={RootRoute.ONBOARDING}>
        <OnboardingPanel
          onStartApp={() => {
            const newHistory = history.filter((value) => value !== RootRoute.ONBOARDING);
            newHistory.push(RootRoute.MAIN);
            setHistory(newHistory);
            router.navigate(RootRoute.MAIN, {}, { replace: true });
          }}
        />
      </Panel>
      <Panel className={classes.root} id={RootRoute.MAIN}>
        <MainPanel onFolderOpen={openFolder} />
      </Panel>
      <Panel className={classes.root} id={RootRoute.FOLDER}>
        <FolderPanel goBack={goHistoryBack} route={route} />
      </Panel>
    </View>
  );
};

export default React.memo(MainView);
