import { DocumentNode } from 'graphql';
import { ChangeBookmarksCollectionParamsInput, DateTime } from './schema';
export declare namespace ChangeBookmarksCollectionMutation {
    interface Arguments {
        params: ChangeBookmarksCollectionParamsInput;
    }
    type changeBookmarksCollection = {
        id: changeBookmarksCollection.id;
        link: changeBookmarksCollection.link;
        title: changeBookmarksCollection.title;
        description: changeBookmarksCollection.description;
        ownerId: changeBookmarksCollection.ownerId;
        collectionId: changeBookmarksCollection.collectionId;
        createdAt: changeBookmarksCollection.createdAt;
    };
    namespace changeBookmarksCollection {
        type id = any;
        type link = string;
        type title = string;
        type description = string | null;
        type ownerId = number;
        type collectionId = any | null;
        type createdAt = DateTime;
    }
}
export interface ChangeBookmarksCollectionMutation {
    changeBookmarksCollection: ChangeBookmarksCollectionMutation.changeBookmarksCollection;
}
export declare const changeBookmarksCollectionMutation: DocumentNode;
