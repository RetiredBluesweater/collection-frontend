import { DocumentNode } from 'graphql';
import { ChangeBookmarksCollectionParamsInput } from './schema';
export declare namespace ChangeBookmarksCollectionMutation {
    interface Arguments {
        params: ChangeBookmarksCollectionParamsInput;
    }
    type changeBookmarksCollection = boolean;
}
export interface ChangeBookmarksCollectionMutation {
    changeBookmarksCollection: ChangeBookmarksCollectionMutation.changeBookmarksCollection;
}
export declare const changeBookmarksCollectionMutation: DocumentNode;
