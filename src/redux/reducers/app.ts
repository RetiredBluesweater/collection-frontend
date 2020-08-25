import { ofType, unionize, UnionOf } from 'unionize';
import { unionizeConfig } from '../utils';
import { SORT_TYPE } from 'src/components/atomic/BookmarksHeader/BookmarksHeader';

export type AppReducerState = {
  fields: { id: any; title: string }[];
  overlay: boolean;
  toolbar: { status: boolean; ref: any };
  sortType: SORT_TYPE;
  actionSheet: { status: boolean; onClose(): void };
};

export const appActions = unionize(
  {
    setFields: ofType<{ id: any; title: string }[]>(),
    setOverlay: ofType<boolean>(),
    setToolBar: ofType<{ status: boolean; ref: any }>(),
    setSortType: ofType<SORT_TYPE>(),
    setActionSheet: ofType<{ status: boolean; onClose(): void }>(),
  },
  unionizeConfig,
);

type AppActions = UnionOf<typeof appActions>;

const initialState: AppReducerState = {
  fields: [],
  overlay: false,
  toolbar: { status: false, ref: null },
  sortType: SORT_TYPE.DATE_NEW,
  actionSheet: { status: false, onClose: () => {} },
};

export function appReducer(state: AppReducerState = initialState, action: AppActions) {
  return appActions.match(action, {
    setFields: (fields) => ({
      ...state,
      fields,
    }),
    setOverlay: (status) => ({
      ...state,
      overlay: status,
    }),
    setToolBar: (obj) => ({
      ...state,
      toolbar: obj,
    }),
    setSortType: (newtype) => ({
      ...state,
      sortType: newtype,
    }),
    setActionSheet: ({ status, onClose }) => ({
      ...state,
      actionSheet: { ...state.actionSheet, status, onClose },
    }),
    default: () => state,
  });
}
