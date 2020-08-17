import React, { useRef, useMemo, useCallback, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/styles';
import clsx from 'clsx';
import { usePrevious } from 'src/hooks/usePrevious';
import { Theme, StatusBarStyle } from 'src/theme';
import { useSelector } from 'src/hooks';
import vkBridge, { VKBridgeSubscribeHandler } from '@vkontakte/vk-bridge';
import { blacked } from 'src/utils/color';

const OVERLAY_BACK_OPACITY = 0.4;

const styles = makeStyles(
  {
    root: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      background: 'rgba(0,0,0,0.4)',
      opacity: 0,
      display: 'none',
    },
    enable: {
      animation: '$fadeIn 0.4s forwards',
      display: 'block',
    },
    disable: {
      display: 'block',
      visibility: 'hidden',
      animation: '$fadeOut 0.4s',
    },
    '@keyframes fadeIn': {
      '0%': {
        display: 'none',
        opacity: 0,
      },
      '1%': {
        display: 'block',
        opacity: 0,
      },
      '100%': {
        display: 'block',
        opacity: 1,
      },
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 1,
      },
      '100%': {
        display: 'none',
        opacity: 0,
      },
    },
  },
  { classNamePrefix: 'overlay' },
);
const Overlay: React.FC<{ enable: boolean }> = ({ enable }) => {
  const classes = styles();

  const isSetViewSettingsSupported = useRef(vkBridge.supports('VKWebAppSetViewSettings')).current;

  const theme = useTheme<Theme>();

  const { mode, customStyle } = useSelector((state) => ({
    mode: state.device.currentStatusBarMode,
    customStyle: state.device.customStatusBarStyle,
  }));

  const currentStyle = useMemo(() => {
    return mode === 'custom' ? customStyle : theme.palette.statusBar[mode];
  }, [mode, customStyle, theme]);

  const setStatusBarStyle = useCallback(
    (currentStyle: StatusBarStyle, modalOpened: boolean) => {
      if (!isSetViewSettingsSupported) return;

      vkBridge.send('VKWebAppSetViewSettings', {
        status_bar_style: currentStyle.style,
        action_bar_color: modalOpened ? blacked(currentStyle.color, OVERLAY_BACK_OPACITY) : currentStyle.color,
      });
    },
    [isSetViewSettingsSupported],
  );

  /* Запоминаем, чтобы не воспроизводить анимацию при моунте */
  const prevStatus = usePrevious(enable);

  useEffect(() => {
    // При обновлении currentStyle или overlayOpened, обновляем стиль статус бара
    setStatusBarStyle(currentStyle, enable);

    // При вовзврате в приложение восстанавливаем установленный стиль статус бара
    // FIXME: https://github.com/VKCOM/vk-bridge/issues/81
    const listener: VKBridgeSubscribeHandler = (event) => {
      if (event.detail.type === 'VKWebAppViewRestore') {
        setStatusBarStyle(currentStyle, enable);
      }
    };

    vkBridge.subscribe(listener);
    return () => vkBridge.unsubscribe(listener);
  }, [setStatusBarStyle, currentStyle, enable]);

  return <div className={clsx(classes.root, enable && classes.enable, !enable && prevStatus && classes.disable)}></div>;
};

export default React.memo(Overlay);
