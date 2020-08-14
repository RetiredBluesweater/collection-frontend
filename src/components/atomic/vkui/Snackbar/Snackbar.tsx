import VKSnackbar, { SnackbarProps } from '../../../overridedVkUi/overlay/Snackbar/Snackbar';
import { styled } from '@material-ui/styles';

export default styled(VKSnackbar)({
  zIndex: 98,
}) as React.FC<SnackbarProps>;
