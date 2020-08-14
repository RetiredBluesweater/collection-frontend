import {useCallback} from 'react';

import {useActions, useSelector} from '../hooks';
import {setStorageValue, dropStorageValues} from '../utils';

import {storageActions, StorageReducerState} from '../redux/reducers/storage';
import {StorageFieldEnum, StorageValueType} from '../types';

type ModifyStorage<F extends StorageFieldEnum> =
  (value: StorageValueType<F> | null) => Promise<void>;

/**
 * Позволяет работать с мемоизированным значение bridge storage.
 * @returns {[StorageReducerState[F], ModifyStorage<F>]}
 * @param field
 */
export function useStorageValue<F extends StorageFieldEnum>(
  field: F,
): [StorageReducerState[F], ModifyStorage<F>] {
  const memoize = useActions(storageActions.memoize);
  const value = useSelector(state => state.storage[field]);
  const modify = useCallback<ModifyStorage<F>>(value => {
    memoize({[field]: value});

    // Если задали null, это означает что свойство хотят дропнуть.
    if (value === null) {
      return dropStorageValues(field);
    }
    return setStorageValue(field, value);
  }, [field, memoize]);

  return [value, modify];
}
