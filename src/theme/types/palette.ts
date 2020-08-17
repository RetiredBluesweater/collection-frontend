import { AppearanceType } from '@vkontakte/vk-bridge';

interface PaletteColor {
  primary: string;
  secondary: string;
}

/**
 * Palette colors
 */
export interface Palette {
  text: PaletteColor;
}
export interface StatusBarStyle {
  style: AppearanceType;
  color: string; // Important! hex or rgb
}

export interface Palette {
  bodyBackground: string;
  bodyText: string;
  text: PaletteColor;
  header: {
    background: string;
    color: string;
  };
  statusBar: {
    default: StatusBarStyle;
  };
  itemShadow: {
    bookmarkArticle: string;
  };
}

export type StatusBarMode = keyof Palette['statusBar'] | 'custom';
