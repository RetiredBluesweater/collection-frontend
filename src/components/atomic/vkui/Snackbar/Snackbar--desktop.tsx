import VKSnackbar, { SnackbarProps } from '../../../overridedVkUi/overlay/Snackbar/Snackbar';
import { styled } from '@material-ui/styles';

export default styled(VKSnackbar)({
  width: 360,
  maxWidth: '100%',

  zIndex: 98,
  '--text_primary': '#fff',
  '--modal_card_background': 'rgba(0, 0, 0, 0.8)',
  '& .Snackbar__body': {
    boxShadow: 'none',
  },
  '& .Snackbar__content-text': {
    fontWeight: 500,
    marginRight: 10,
    lineHeight: '1.4em',
  },
  '& .Snackbar__before svg, & .Snackbar__before svg > use, & .Snackbar__action': {
    color: '#fff!important',
  },
  '&.Snackbar--closing .Snackbar__in': {
    transform: 'translate3d(-140%,0,0)',
  },
}) as React.FC<SnackbarProps>;
