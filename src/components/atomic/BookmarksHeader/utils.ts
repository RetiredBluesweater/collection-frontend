import { SORT_TYPE } from './BookmarksHeader';

export const getSortName = (sortType: SORT_TYPE) => {
  switch (sortType) {
    case SORT_TYPE.DATE_NEW:
      return 'Сначала новые';
    case SORT_TYPE.DATE_OLD:
      return 'Сначала старые';
    default:
      break;
  }
};
