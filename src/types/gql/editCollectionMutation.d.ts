import { DocumentNode } from 'graphql';
import { EditCollectionParamsInput, DateTime } from './schema';
export declare namespace EditCollectionMutation {
    interface Arguments {
        params: EditCollectionParamsInput;
    }
    type editCollection = {
        id: editCollection.id;
        title: editCollection.title;
        description: editCollection.description;
        ownerId: editCollection.ownerId;
        bookmarks: editCollection.bookmarks;
        createdAt: editCollection.createdAt;
    };
    namespace editCollection {
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
export interface EditCollectionMutation {
    editCollection: EditCollectionMutation.editCollection;
}
export declare const editCollectionMutation: DocumentNode;
