import { useOverlayContext } from '../Provider/context';

export const useSnackbar = () => useOverlayContext().openSnackbar;
