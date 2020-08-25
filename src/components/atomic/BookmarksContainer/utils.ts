import { SORT_TYPE } from '../BookmarksHeader/BookmarksHeader';
import { Collection, Bookmark } from 'src/types';

export const sortCollections = (sortType: SORT_TYPE, collections: Collection[]) => {
  return collections.sort((a, b) => {
    const c = new Date(a.createdAt).getTime();
    const d = new Date(b.createdAt).getTime();
    return sortType === SORT_TYPE.DATE_NEW ? d - c : c - d;
  });
};

export const sortBookmarks = (sortType: SORT_TYPE, bookmarks: Bookmark[]) => {
  return bookmarks.sort((a, b) => {
    const c = new Date(a.createdAt).getTime();
    const d = new Date(b.createdAt).getTime();
    return sortType === SORT_TYPE.DATE_NEW ? d - c : c - d;
  });
};
