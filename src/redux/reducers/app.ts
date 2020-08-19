import { ofType, unionize, UnionOf } from 'unionize';
import { unionizeConfig } from '../utils';

export type AppReducerState = {
  fields: { id: any; title: string }[];
  overlay: boolean;
  toolbar: { status: boolean; ref: any };
};

export const appActions = unionize(
  {
    setFields: ofType<{ id: any; title: string }[]>(),
    setOverlay: ofType<boolean>(),
    setToolBar: ofType<{ status: boolean; ref: any }>(),
  },
  unionizeConfig,
);

type AppActions = UnionOf<typeof appActions>;

const initialState: AppReducerState = {
  fields: [],
  overlay: false,
  toolbar: { status: false, ref: null },
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
    default: () => state,
  });
}
