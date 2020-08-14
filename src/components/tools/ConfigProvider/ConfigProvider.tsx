import React, { memo } from 'react';
import VKConfigProvider from '@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider';
import { useSelector } from '../../../hooks/useSelector';

const ConfigProvider = memo(({ children }) => {
  const { scheme /* isDesktop */ } = useSelector((state) => ({
    scheme: state.appConfig.scheme,
    isDesktop: state.launchParams.platform === 'desktop_web',
  }));

  return (
    <VKConfigProvider scheme={scheme} isWebView={true} transitionMotionEnabled={false}>
      {children}
    </VKConfigProvider>
  );
});

export default ConfigProvider;
