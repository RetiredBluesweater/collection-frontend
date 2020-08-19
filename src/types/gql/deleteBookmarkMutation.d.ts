import { DocumentNode } from 'graphql';
import { DeleteBookmarkParamsInput } from './schema';
export declare namespace DeleteBookmarkMutation {
    interface Arguments {
        params: DeleteBookmarkParamsInput;
    }
    type deleteBookmark = boolean;
}
export interface DeleteBookmarkMutation {
    deleteBookmark: DeleteBookmarkMutation.deleteBookmark;
}
export declare const deleteBookmarkMutation: DocumentNode;
