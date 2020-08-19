import { DocumentNode } from 'graphql';
import { CreateCollectionParamsInput, DateTime } from './schema';
export declare namespace CreateCollectionMutation {
    interface Arguments {
        params: CreateCollectionParamsInput;
    }
    type createCollection = {
        id: createCollection.id;
        title: createCollection.title;
        description: createCollection.description;
        ownerId: createCollection.ownerId;
        bookmarks: createCollection.bookmarks;
        createdAt: createCollection.createdAt;
    };
    namespace createCollection {
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
export interface CreateCollectionMutation {
    createCollection: CreateCollectionMutation.createCollection;
}
export declare const createCollectionMutation: DocumentNode;
