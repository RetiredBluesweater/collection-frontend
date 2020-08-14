import Snackbar from './Snackbar';
import SnackbarDesktop from './Snackbar--desktop';
import { getPlatformComponent } from '@overrided-vkui/utils/getPlatformComponent';

export default getPlatformComponent({ mobile: Snackbar, desktop: SnackbarDesktop });
