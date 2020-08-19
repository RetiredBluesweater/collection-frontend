import { DocumentNode } from 'graphql';
import { DeleteCollectionParamsInput } from './schema';
export declare namespace DeleteCollectionMutation {
    interface Arguments {
        params: DeleteCollectionParamsInput;
    }
    type deleteCollection = boolean;
}
export interface DeleteCollectionMutation {
    deleteCollection: DeleteCollectionMutation.deleteCollection;
}
export declare const deleteCollectionMutation: DocumentNode;
