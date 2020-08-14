import React, { memo } from 'react';
import VKAlert, { AlertProps as VKAlertProps } from '@vkontakte/vkui/dist/components/Alert/Alert';
import Popout from '../Popout/Popout';

export interface AlertProps extends VKAlertProps {
  show: boolean;
}

const Alert: React.FC<AlertProps> = memo(({ show, ...alertProps }) => (
  <Popout show={show}>
    <VKAlert {...alertProps} />
  </Popout>
));

export default Alert;
