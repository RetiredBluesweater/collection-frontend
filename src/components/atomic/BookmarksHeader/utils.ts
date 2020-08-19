import { SORT_TYPE } from './BookmarksHeader';

export const getSortName = (sortType: SORT_TYPE) => {
  switch (sortType) {
    case SORT_TYPE.NAME:
      return 'По названию';
      break;
    case SORT_TYPE.DATE:
      return 'По дате';
      break;
    default:
      break;
  }
};
