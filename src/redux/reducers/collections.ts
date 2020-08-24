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
    deleteBookmark: ofType<{ id: string; collectionId: string | null }>(),
    editCollection: ofType<Partial<Collection>>(),
    editBookmark: ofType<Bookmark>(),
    transfer: ofType<{ bookmark: Bookmark; collectionId: string }>(),
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
    deleteBookmark: ({ id, collectionId }) => {
      if (collectionId) {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collectionId === collection.id
              ? { ...collection, bookmarks: collection.bookmarks.filter((bookmark) => bookmark.id !== id) }
              : collection,
          ),
        };
      } else {
        return {
          ...state,
          uncollected: state.uncollected.filter((item) => item.id !== id),
        };
      }
    },
    editCollection: ({ id, ...rest }) => ({
      ...state,
      collections: state.collections.map((collection) =>
        collection.id === id ? { ...collection, ...rest } : collection,
      ),
    }),
    editBookmark: (newBookmark) => {
      const { id, collectionId } = newBookmark;

      const isUncollected = state.uncollected.find((item) => item.id === id);
      const prevCollectionId = state.collections.find((collection) =>
        collection.bookmarks.find((bookmark) => bookmark.id === id),
      )?.id;
      const isSameCollection = prevCollectionId === collectionId;

      if (isUncollected && collectionId) {
        return {
          ...state,
          uncollected: state.uncollected.filter((item) => item.id !== id),
          collections: state.collections.map((collection) =>
            collectionId === collection.id
              ? {
                  ...collection,
                  bookmarks: [...collection.bookmarks, newBookmark],
                }
              : collection,
          ),
        };
      } else if (!isUncollected && !collectionId && prevCollectionId) {
        return {
          ...state,
          uncollected: [...state.uncollected, newBookmark],
          collections: state.collections.map((collection) =>
            collection.id === prevCollectionId
              ? { ...collection, bookmarks: collection.bookmarks.filter((bookmark) => bookmark.id !== id) }
              : collection,
          ),
        };
      } else if (!isUncollected && collectionId && !isSameCollection) {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collection.id === prevCollectionId
              ? { ...collection, bookmarks: collection.bookmarks.filter((bookmark) => bookmark.id !== id) }
              : collection.id === collectionId
              ? { ...collection, bookmarks: [...collection.bookmarks, newBookmark] }
              : collection,
          ),
        };
      } else if (!isUncollected && collectionId && isSameCollection) {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collectionId === collection.id
              ? {
                  ...collection,
                  bookmarks: collection.bookmarks.map((bookmark) =>
                    bookmark.id === id ? { ...bookmark, ...newBookmark } : bookmark,
                  ),
                }
              : collection,
          ),
        };
      } else {
        return {
          ...state,
          uncollected: state.uncollected.map((item) => (item.id === id ? { ...item, ...newBookmark } : item)),
        };
      }
    },
    transfer: ({ bookmark, collectionId }) => {
      const { id } = bookmark;
      const isUncollected = state.uncollected.find((item) => item.id === id);
      const prevCollectionId = state.collections.find((collection) =>
        collection.bookmarks.find((bookmark) => bookmark.id === id),
      )?.id;

      if (isUncollected && collectionId) {
        return {
          ...state,
          uncollected: state.uncollected.filter((item) => item.id !== id),
          collections: state.collections.map((collection) =>
            collection.id === collectionId
              ? { ...collection, bookmarks: [...collection.bookmarks, bookmark] }
              : collection,
          ),
        };
      } else if (!isUncollected && !collectionId) {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collection.id === prevCollectionId
              ? { ...collection, bookmarks: collection.bookmarks.filter((bookmark) => bookmark.id !== id) }
              : collection,
          ),
          uncollected: [...state.uncollected, bookmark],
        };
      } else {
        return {
          ...state,
          collections: state.collections.map((collection) =>
            collection.id === prevCollectionId
              ? { ...collection, bookmarks: collection.bookmarks.filter((bookmark) => bookmark.id !== id) }
              : collection.id === collectionId
              ? { ...collection, bookmarks: [...collection.bookmarks, bookmark] }
              : collection,
          ),
        };
      }
    },
    default: () => state,
  });
}
