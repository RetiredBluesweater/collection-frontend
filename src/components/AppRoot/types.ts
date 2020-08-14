import { StorageValuesMap } from '../../types';

export interface AppRootState {
  loading: boolean;
  error?: string | null;
  storage?: Partial<StorageValuesMap>;
}

export interface AppRootContext {
  /**
   * Initializes application
   */
  init(): void;
}
