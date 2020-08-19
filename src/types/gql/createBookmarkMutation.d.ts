import { DocumentNode } from 'graphql';
import { CreateBookmarkParamsInput, DateTime } from './schema';
export declare namespace CreateBookmarkMutation {
    interface Arguments {
        params: CreateBookmarkParamsInput;
    }
    type createBookmark = {
        id: createBookmark.id;
        link: createBookmark.link;
        title: createBookmark.title;
        description: createBookmark.description;
        ownerId: createBookmark.ownerId;
        collectionId: createBookmark.collectionId;
        createdAt: createBookmark.createdAt;
    };
    namespace createBookmark {
        type id = any;
        type link = string;
        type title = string;
        type description = string | null;
        type ownerId = number;
        type collectionId = any | null;
        type createdAt = DateTime;
    }
}
export interface CreateBookmarkMutation {
    createBookmark: CreateBookmarkMutation.createBookmark;
}
export declare const createBookmarkMutation: DocumentNode;
