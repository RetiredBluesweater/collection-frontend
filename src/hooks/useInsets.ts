import {useSelector} from './useSelector';

/**
 * Возвращает внутренние рамки устройства
 */
export const useInsets = () => useSelector((state) => state.device.insets);
