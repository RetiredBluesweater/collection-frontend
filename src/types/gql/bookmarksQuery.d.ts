import { DocumentNode } from 'graphql';
import { DateTime } from './schema';
export declare namespace BookmarksQuery {
    interface Arguments {
    }
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
}
export interface BookmarksQuery {
    bookmarks: BookmarksQuery.bookmarks;
}
export declare const bookmarksQuery: DocumentNode;
