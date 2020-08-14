import { StorageReducerState } from './reducers/storage';
import { AppConfigReducerState } from './reducers/appConfig';
import { DeviceReducerState } from './reducers/device';
import { LaunchParamsReducerState } from './reducers/launch-params';
import { VkUserReducerState } from './reducers/vkUser';
import { ConfigReducerState } from './reducers/config';
import { AppReducerState } from './reducers/app';

/**
 * Redux state fields description
 */
export interface ReduxState {
  appConfig: AppConfigReducerState;
  device: DeviceReducerState;
  launchParams: LaunchParamsReducerState;
  storage: StorageReducerState;
  vkUser: VkUserReducerState;
  config: ConfigReducerState;
  app: AppReducerState;
}
