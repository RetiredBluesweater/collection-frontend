import { DefaultUpdateConfigData, MVKUpdateConfigData } from '@vkontakte/vk-bridge';

export interface PreparedMVKAppConfig extends Omit<MVKUpdateConfigData, 'viewport_width' | 'viewport_height'> {
  viewportWidth: number;
  viewportHeight: number;
}

export interface PreparedDefaultAppConfig extends Omit<DefaultUpdateConfigData, 'app_id'> {
  appId: string;
}

export type AppConfig = PreparedMVKAppConfig & PreparedDefaultAppConfig;

export interface Insets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Available operating systems
 */
export enum OS {
  IOS,
  Android,
}
