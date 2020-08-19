import { ofType, unionize, UnionOf } from 'unionize';
import { unionizeConfig } from '../utils';
import { Collection, Bookmark } from '../../types/gql';

export type CollectionsReducerState = {
  collections: Collection[];
  uncollected: Bookmark[];
};

export const collectionsActions = unionize(
  {
    createCollectiion: ofType<Collection>(),
    deleteCollection: ofType<{ id: string }>(),
    createBookmark: ofType<Bookmark>(),
  },
  unionizeConfig,
);

type CollectionsActions = UnionOf<typeof collectionsActions>;

const initialState: CollectionsReducerState = {
  collections: [],
  uncollected: [],
};

export function collectionsReducer(state: CollectionsReducerState = initialState, action: CollectionsActions) {
  return collectionsActions.match(action, {
    createCollectiion: (collection) => ({
      ...state,
      collections: [...state.collections, collection],
    }),
    deleteCollection: ({ id }) => ({
      ...state,
      collections: state.collections.filter((collection) => collection.id !== id),
    }),
    createBookmark: (bookmark) => {
      const isAddToCollection = bookmark.collectionId;
      if (isAddToCollection) {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collection.id === bookmark.collectionId
              ? { ...collection, bookmarks: [...collection.bookmarks, bookmark] }
              : collection,
          ),
        };
      } else {
        return {
          ...state,
          uncollected: [...state.uncollected, bookmark],
        };
      }
    },
    default: () => state,
  });
}
