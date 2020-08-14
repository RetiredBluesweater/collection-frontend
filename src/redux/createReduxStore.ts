import { ReduxState } from './types';
import { Store, createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import { storageReducer } from './reducers/storage';
import { appConfigReducer } from './reducers/appConfig';
import { deviceReducer } from './reducers/device';
import { launchParamsReducer } from './reducers/launch-params';
import { vkUserReducer } from './reducers/vkUser';
import { configReducer } from './reducers/config';
import { appReducer } from './reducers/app';

const reducers = combineReducers<ReduxState>({
  appConfig: appConfigReducer,
  device: deviceReducer,
  launchParams: launchParamsReducer,
  storage: storageReducer,
  vkUser: vkUserReducer,
  config: configReducer,
  app: appReducer,
});

export function createReduxStore(state?: Partial<ReduxState>): Store<ReduxState> {
  return createStore(reducers, state, devToolsEnhancer({}));
}
