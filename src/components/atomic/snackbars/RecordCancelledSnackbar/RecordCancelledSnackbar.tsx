import React, { memo } from 'react';
import Snackbar from '../../vkui/Snackbar';
import { SnackbarProps } from '@overrided-vkui/overlay/Snackbar/Snackbar';
import { ReactComponent as Icon24CheckCircle } from '../../../../assets/check-circle-24.svg';

const RecordCancelledSnackbar: React.FC<SnackbarProps> = memo((snackbarProps) => (
  <Snackbar {...snackbarProps} before={<Icon24CheckCircle style={{ display: 'block', color: 'var(--accent)' }} />}>
    Запись отменена
  </Snackbar>
));

export default RecordCancelledSnackbar;
