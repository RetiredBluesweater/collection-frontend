import { DocumentNode } from 'graphql';
import { EditBookmarkParamsInput, DateTime } from './schema';
export declare namespace EditBookmarkMutation {
    interface Arguments {
        params: EditBookmarkParamsInput;
    }
    type editBookmark = {
        id: editBookmark.id;
        link: editBookmark.link;
        title: editBookmark.title;
        description: editBookmark.description;
        ownerId: editBookmark.ownerId;
        collectionId: editBookmark.collectionId;
        createdAt: editBookmark.createdAt;
    };
    namespace editBookmark {
        type id = any;
        type link = string;
        type title = string;
        type description = string | null;
        type ownerId = number;
        type collectionId = any | null;
        type createdAt = DateTime;
    }
}
export interface EditBookmarkMutation {
    editBookmark: EditBookmarkMutation.editBookmark;
}
export declare const editBookmarkMutation: DocumentNode;
