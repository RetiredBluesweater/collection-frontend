import { DocumentNode } from 'graphql';
import { DateTime } from './schema';
export declare namespace CollectionsQuery {
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
}
export interface CollectionsQuery {
    collections: CollectionsQuery.collections;
}
export declare const collectionsQuery: DocumentNode;
