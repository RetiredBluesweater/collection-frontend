/**
 * List of keys, which can be placed into bridge storage
 */
export enum StorageFieldEnum {
  ApplicationVisited = 'application-visited',
  OnboardingCompleted = 'onboarding-completed',
  FirstVisit = 'first-visit',
  IsAskedAddToHomeScreen = 'is-asked-add-to-home-screen',
  IsAddedToHomeScreen = 'is-added-to-home-screen',
}

/**
 * Describes which bridge storage key has stated data type
 */
export interface StorageValuesMap {
  [StorageFieldEnum.ApplicationVisited]: boolean;
  [StorageFieldEnum.OnboardingCompleted]: boolean;
  [StorageFieldEnum.FirstVisit]: boolean;
  [StorageFieldEnum.IsAskedAddToHomeScreen]: boolean;
  [StorageFieldEnum.IsAddedToHomeScreen]: boolean;
}

/**
 * Возвращает тип данных для указанного поля хранилища.
 */
export type StorageValueType<T extends StorageFieldEnum> = StorageValuesMap[T];
