import React from 'react';
import { platform } from './platform';

export function getPlatformComponent<T>({ mobile, desktop }: { mobile: React.FC<T>; desktop: React.FC<T> }) {
  return platform === 'desktop' ? desktop : mobile;
}
