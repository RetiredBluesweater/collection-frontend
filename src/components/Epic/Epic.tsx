import React, { useCallback } from 'react';
import { FixedLayout } from '@vkontakte/vkui';
import { makeStyles } from '@material-ui/styles';
import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import { useRoute } from 'react-router5';
import { RootRoute } from '../../router';
import clsx from 'clsx';
import { throttle } from 'throttle-debounce';
import { useSelector } from 'src/hooks';
import { Insets } from '@vkontakte/vk-bridge';

const styles = makeStyles(
  {
    tabsContainer: {
      height: 48,
      zIndex: 99,
      borderTop: '1px solid var(--background_keyboard)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: 'var(--background_content)',
    },
    tabsItem: {
      flex: '1 0 0',
      display: 'flex',
      justifyContent: 'center',
      cursor: 'pointer',
    },
    tabsItemIcon: {
      padding: '12px 20px',
      color: 'var(--content_placeholder_icon)',
      '&:hover': {
        color: 'var(--tabbar_active_icon)',
      },
    },
    tabsItemIconActive: {
      color: 'var(--tabbar_active_icon)',
    },
    fixedLayout: {
      zIndex: 99,
      backgroundColor: 'var(--background_content)',
      paddingBottom: (props: { insets: Insets }) => `${props.insets.bottom}px`,
    },
  },
  { classNamePrefix: 'Epic' },
);
const Epic = () => {
  const { router, route } = useRoute();
  const insets = useSelector((state) => state.device.currentInsets);

  const activeView = route.name.split('.')[0];

  const classes = styles({ insets });

  const throttledNavigate = useCallback(
    throttle(700, true, (path: RootRoute) => {
      if (path === RootRoute.FOLDERS) {
        router.navigate(RootRoute.FOLDERS);
      } else if (path === RootRoute.ARTICLES) {
        router.navigate(RootRoute.ARTICLES);
      } else {
        router.navigate(RootRoute.FOLDERS);
      }
    }),
    [],
  );
  return (
    <FixedLayout className={classes.fixedLayout} vertical="bottom">
      <div className={classes.tabsContainer}>
        <div className={classes.tabsItem}>
          <Icon28UsersOutline
            onClick={() => throttledNavigate(RootRoute.FOLDERS)}
            className={clsx(classes.tabsItemIcon, activeView === RootRoute.FOLDERS && classes.tabsItemIconActive)}
          />
        </div>
        <div className={classes.tabsItem}>
          <Icon28Notifications
            onClick={() => throttledNavigate(RootRoute.ARTICLES)}
            className={clsx(classes.tabsItemIcon, activeView === RootRoute.ARTICLES && classes.tabsItemIconActive)}
          />
        </div>
      </div>
    </FixedLayout>
  );
};

export default React.memo(Epic);
