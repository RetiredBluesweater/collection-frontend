import { platform } from './platform';

export const getPlatformClassName = (base: string) => {
  return `${base} ${base}--${platform === 'desktop' ? 'desktop' : 'mobile'}`;
};
