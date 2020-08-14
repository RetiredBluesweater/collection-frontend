import {ofType, unionize, UnionOf} from 'unionize';
import {unionizeConfig} from '../utils';
import {StorageFieldEnum, StorageValuesMap} from '../../types';

export type StorageReducerState = {
  [F in StorageFieldEnum]?: StorageValuesMap[F]
};

export const storageActions = unionize({
  memoize: ofType<{ [F in StorageFieldEnum]?: StorageValuesMap[F] }>(),
  dropAllValues: {},
}, unionizeConfig);

type StorageAction = UnionOf<typeof storageActions>;

const initialState: StorageReducerState = {};

export function storageReducer(
  state: StorageReducerState = initialState,
  action: StorageAction,
) {
  return storageActions.match(action, {
    memoize: memo => ({...state, ...memo}),
    dropAllValues: () => ({}),
    default: () => state,
  });
}
