type Platform = 'desktop' | 'mobile';

const vkPlatform = window.location.search
  .slice(1)
  .split('&')
  .map((pair) => pair.split('=') as [string, string])
  .find(([key]) => key === 'vk_platform');

export const platform: Platform = !vkPlatform || vkPlatform[1] === 'desktop_web' ? 'desktop' : 'mobile';
