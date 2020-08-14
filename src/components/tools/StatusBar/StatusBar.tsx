import { memo, useEffect, useCallback, useRef, useMemo } from 'react';
import vkBridge, { VKBridgeSubscribeHandler } from '@vkontakte/vk-bridge';
import { useTheme } from '@material-ui/styles';
import { Theme, StatusBarStyle } from '../../../theme';
import { useSelector } from '../../../hooks/useSelector';
import { blacked } from '../../../utils/color';
import { useOverlayContext } from '../../overridedVkUi/overlay/Provider/context';

const OVERLAY_BACK_OPACITY = 0.4;

/**
 * Обновляет стиль статус бара в зависимости от выбранной темы и
 * актуальных значений StatusBar в redux хранилище, а также автоматически
 * затемняет цвет статус бара в момент, когда открыто модальное окно или попаут
 */
export const StatusBar = memo(() => {
  const isSetViewSettingsSupported = useRef(vkBridge.supports('VKWebAppSetViewSettings')).current;

  const theme = useTheme<Theme>();

  const { mode, customStyle } = useSelector((state) => ({
    mode: state.device.currentStatusBarMode,
    customStyle: state.device.customStatusBarStyle,
  }));

  const currentStyle = useMemo(() => {
    return mode === 'custom' ? customStyle : theme.palette.statusBar[mode];
  }, [mode, customStyle, theme]);

  const { overlayOpened } = useOverlayContext();

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

  useEffect(() => {
    // При обновлении currentStyle или overlayOpened, обновляем стиль статус бара
    setStatusBarStyle(currentStyle, overlayOpened);

    // При вовзврате в приложение восстанавливаем установленный стиль статус бара
    // FIXME: https://github.com/VKCOM/vk-bridge/issues/81
    const listener: VKBridgeSubscribeHandler = (event) => {
      if (event.detail.type === 'VKWebAppViewRestore') {
        setStatusBarStyle(currentStyle, overlayOpened);
      }
    };

    vkBridge.subscribe(listener);
    return () => vkBridge.unsubscribe(listener);
  }, [setStatusBarStyle, currentStyle, overlayOpened]);

  return null;
});
