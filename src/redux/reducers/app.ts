import { ofType, unionize, UnionOf } from 'unionize';
import { unionizeConfig } from '../utils';

export type AppReducerState = {
  fields: { id: any; title: string }[];
};

export const appActions = unionize(
  {
    setFields: ofType<{ id: any; title: string }[]>(),
  },
  unionizeConfig,
);

type AppActions = UnionOf<typeof appActions>;

const initialState: AppReducerState = {
  fields: [],
};

export function appReducer(state: AppReducerState = initialState, action: AppActions) {
  return appActions.match(action, {
    setFields: (fields) => ({
      ...state,
      fields,
    }),
    default: () => state,
  });
}
