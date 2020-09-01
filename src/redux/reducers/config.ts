import { Config } from '../../config';

export interface ConfigReducerState extends Config {}

const initialState: ConfigReducerState = {
  gqlHttpUrl: '',
  groupId: 0,
};

/**
 * Responsible for envrionment config state
 * @param {ConfigReducerState} state
 * @returns {ConfigReducerState}
 */
export function configReducer(state: ConfigReducerState = initialState) {
  return state;
}
