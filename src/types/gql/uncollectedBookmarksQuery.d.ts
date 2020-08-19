import { DocumentNode } from 'graphql';
import { DateTime } from './schema';
export declare namespace UncollectedBookmarksQuery {
    interface Arguments {
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
export interface UncollectedBookmarksQuery {
    uncollectedBookmarks: UncollectedBookmarksQuery.uncollectedBookmarks;
}
export declare const uncollectedBookmarksQuery: DocumentNode;
