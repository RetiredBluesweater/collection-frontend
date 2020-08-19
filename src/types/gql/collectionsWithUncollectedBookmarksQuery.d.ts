import { DocumentNode } from 'graphql';
import { DateTime } from './schema';
export declare namespace CollectionsWithUncollectedBookmarksQuery {
    interface Arguments {
    }
    type collections = {
        id: collections.id;
        title: collections.title;
        description: collections.description;
        ownerId: collections.ownerId;
        bookmarks: collections.bookmarks;
        createdAt: collections.createdAt;
    }[];
    namespace collections {
        type id = any;
        type title = string;
        type description = string | null;
        type ownerId = number;
        type bookmarks = {
            id: bookmarks.id;
            link: bookmarks.link;
            title: bookmarks.title;
            description: bookmarks.description;
            ownerId: bookmarks.ownerId;
            collectionId: bookmarks.collectionId;
            createdAt: bookmarks.createdAt;
        }[];
        namespace bookmarks {
            type id = any;
            type link = string;
            type title = string;
            type description = string | null;
            type ownerId = number;
            type collectionId = any | null;
            type createdAt = DateTime;
        }
        type createdAt = DateTime;
    }
    type uncollectedBookmarks = {
        id: uncollectedBookmarks.id;
        link: uncollectedBookmarks.link;
        title: uncollectedBookmarks.title;
        description: uncollectedBookmarks.description;
        ownerId: uncollectedBookmarks.ownerId;
        collectionId: uncollectedBookmarks.collectionId;
        createdAt: uncollectedBookmarks.createdAt;
    }[];
    namespace uncollectedBookmarks {
        type id = any;
        type link = string;
        type title = string;
        type description = string | null;
        type ownerId = number;
        type collectionId = any | null;
        type createdAt = DateTime;
    }
}
export interface CollectionsWithUncollectedBookmarksQuery {
    collections: CollectionsWithUncollectedBookmarksQuery.collections;
    uncollectedBookmarks: CollectionsWithUncollectedBookmarksQuery.uncollectedBookmarks;
}
export declare const collectionsWithUncollectedBookmarksQuery: DocumentNode;
