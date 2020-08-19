import { ofType, unionize, UnionOf } from 'unionize';
import { unionizeConfig } from '../utils';

export type AppReducerState = {
  fields: { id: any; title: string }[];
  overlay: boolean;
};

export const appActions = unionize(
  {
    setFields: ofType<{ id: any; title: string }[]>(),
    setOverlay: ofType<boolean>(),
  },
  unionizeConfig,
);

type AppActions = UnionOf<typeof appActions>;

const initialState: AppReducerState = {
  fields: [],
  overlay: false,
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
    default: () => state,
  });
}
