import vkBridge from '@vkontakte/vk-bridge';
import {StringKeys, StorageFieldEnum, StorageValuesMap, StorageValueType} from '../types';

export async function getStorageKeys<S extends {}>(
  ...keys: StringKeys<S>[]
): Promise<Partial<S>> {
  const {keys: storageKeys} = await vkBridge.send('VKWebAppStorageGet', {keys});

  return storageKeys.reduce<Partial<S>>((acc, k) => {
    try {
      acc[k.key as keyof S] = JSON.parse(decodeURIComponent(k.value));
    } catch (e) {
    }
    return acc;
  }, {});
}

/**
 * Задает значение для ключа хранилища.
 * @param {F} field
 * @param {StorageValueType<F>} value
 * @returns {Promise<string extends ReceiveMethodName ? ReceiveData<string> : void>}
 */
export async function setStorageValue<F extends StorageFieldEnum>(
  field: F,
  value: StorageValueType<F>,
): Promise<void> {

  await vkBridge.send('VKWebAppStorageSet', {
    key: field,
    // encodeURIComponent - хак для русских букв. Они некорректно записываются
    // в хранилище.
    value: encodeURIComponent(JSON.stringify(value)),
  });
}

/**
 * То же самое что setStorageValue только сразу для нескольких значений.
 * @param {Partial<StorageValuesMap>} values
 * @returns {Promise<void>}
 */
export async function setStorageValues(
  values: Partial<StorageValuesMap>,
): Promise<void> {
  await Promise.all(
    Object.entries(values).map(([field, value]) => {
      return vkBridge.send('VKWebAppStorageSet', {
        key: field,
        value: encodeURIComponent(JSON.stringify(value)),
      })
    })
  );
}

/**
 * Достает значения их хранилища.
 * @param {F} fields
 * @returns {Promise<{[Key in F]?: StorageValueType<Key>}>}
 */
export async function getStorageValues<F extends StorageFieldEnum>(
  ...fields: F[]
): Promise<{ [Key in F]?: StorageValueType<Key> }> {
  const {keys} = await vkBridge.send('VKWebAppStorageGet', {
    keys: fields,
  });

  return keys.reduce<{ [Key in F]: StorageValueType<Key> }>((acc, k) => {
    try {
      acc[k.key as F] = JSON.parse(decodeURIComponent(k.value));
    } catch (e) {
    }
    return acc;
  }, {} as { [Key in F]: StorageValueType<Key> });
}

/**
 * Удаляет значения из хранилища.
 * @param {StorageFieldEnum} fields
 * @returns {Promise<void>}
 */
export async function dropStorageValues(
  ...fields: StorageFieldEnum[]
): Promise<void> {
  await Promise.all(
    fields.map(f => vkBridge.send('VKWebAppStorageSet', {
      key: f,
      value: '',
    })),
  );
}

/**
 * Полностью удаляет все значения из хранилища
 * @returns {Promise<void>}
 */
export function dropStorage() {
  return dropStorageValues(...Object.values(StorageFieldEnum));
}

/**
 * Возвращает хранилище
 * @returns {Promise<{[Key in any]?: StorageValueType<Key>}>}
 */
export function getStorage() {
  return getStorageValues(...Object.values(StorageFieldEnum));
}
