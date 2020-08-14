import React, { memo } from 'react';
import VKScreenSpinner, {
  ScreenSpinnerProps as VKScreenSpinnerProps,
} from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import Popout from '../Popout/Popout';

export interface ScreenSpinnerProps extends VKScreenSpinnerProps {
  show: boolean;
}

const ScreenSpinner: React.FC<ScreenSpinnerProps> = memo(({ show, ...screenSpinnerProps }) => (
  <Popout show={show}>
    <VKScreenSpinner {...screenSpinnerProps} />
  </Popout>
));

export default ScreenSpinner;
