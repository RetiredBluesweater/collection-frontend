import React, { memo } from 'react';
import VKActionSheet, {
  ActionSheetProps as VKActionSheetProps,
} from '@vkontakte/vkui/dist/components/ActionSheet/ActionSheet';
import ActionSheetItem from '@vkontakte/vkui/dist/components/ActionSheetItem/ActionSheetItem';
import Popout from '../Popout/Popout';

export interface ActionSheetProps extends VKActionSheetProps {
  show: boolean;
}

const ActionSheet: React.FC<ActionSheetProps> = memo(({ show, ...actionSheetProps }) => (
  <Popout show={show}>
    <VKActionSheet {...actionSheetProps} />
  </Popout>
));

export default Object.assign(ActionSheet, { Item: ActionSheetItem });
