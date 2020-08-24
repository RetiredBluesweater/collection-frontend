/**
 * Represents a date in ISO format
 */
export declare type DateTime = Date;
/**
 * Project common user
 */
export declare namespace User {
    /**
     * If is ADMIN
     */
    type isAdmin = boolean;
    /**
     * VKontakte unique identifier
     */
    type vkUserId = number;
    /**
     * First name
     */
    type firstName = string;
    /**
     * Last name
     */
    type lastName = string;
    /**
     * Photo
     */
    type photo = string;
}
export interface User {
    isAdmin: User.isAdmin;
    vkUserId: User.vkUserId;
    firstName: User.firstName;
    lastName: User.lastName;
    photo: User.photo;
}
export declare namespace Bookmark {
    /**
     * ID
     */
    type id = any;
    /**
     * Link
     */
    type link = string;
    /**
     * Title
     */
    type title = string;
    /**
     * Description
     */
    type description = string | null;
    /**
     * Owner ID
     */
    type ownerId = number;
    /**
     * Collection ID
     */
    type collectionId = any | null;
    /**
     * Created At
     */
    type createdAt = DateTime;
}
export interface Bookmark {
    id: Bookmark.id;
    link: Bookmark.link;
    title: Bookmark.title;
    description: Bookmark.description;
    ownerId: Bookmark.ownerId;
    collectionId: Bookmark.collectionId;
    createdAt: Bookmark.createdAt;
}
export declare namespace Collection {
    /**
     * ID
     */
    type id = any;
    /**
     * Title
     */
    type title = string;
    /**
     * Description
     */
    type description = string | null;
    /**
     * Owner ID
     */
    type ownerId = number;
    /**
     * Bookmarks
     */
    type bookmarks = Bookmark[];
    /**
     * Created At
     */
    type createdAt = DateTime;
}
export interface Collection {
    id: Collection.id;
    title: Collection.title;
    description: Collection.description;
    ownerId: Collection.ownerId;
    bookmarks: Collection.bookmarks;
    createdAt: Collection.createdAt;
}
export declare namespace Query {
    /**
     * Returns current user information
     */
    type user = User | null;
    /**
     * Returns user by specified user id
     */
    type userById = User;
    namespace userById {
        interface Arguments {
            userId: any;
        }
    }
    /**
     * Returns collections
     */
    type collections = Collection[];
    /**
     * Returns uncollected bookmarks
     */
    type uncollectedBookmarks = Bookmark[];
    /**
     * Returns bookmarks
     */
    type bookmarks = Bookmark[];
}
export interface Query {
    user: Query.user;
    userById: Query.userById;
    collections: Query.collections;
    uncollectedBookmarks: Query.uncollectedBookmarks;
    bookmarks: Query.bookmarks;
}
/**
 * Create Collection Params Input
 */
export declare namespace CreateCollectionParamsInput {
    /**
     * Title
     */
    type title = string;
}
export interface CreateCollectionParamsInput {
    title: CreateCollectionParamsInput.title;
}
/**
 * Create Bookmark Params Input
 */
export declare namespace CreateBookmarkParamsInput {
    /**
     * Link
     */
    type link = string;
    /**
     * Title
     */
    type title = string;
    /**
     * collection ID
     */
    type collectionId = any | null;
}
export interface CreateBookmarkParamsInput {
    link: CreateBookmarkParamsInput.link;
    title: CreateBookmarkParamsInput.title;
    collectionId: CreateBookmarkParamsInput.collectionId;
}
/**
 * Edit Collection Params Input
 */
export declare namespace EditCollectionParamsInput {
    /**
     * ID
     */
    type id = any;
    /**
     * Title
     */
    type title = string;
}
export interface EditCollectionParamsInput {
    id: EditCollectionParamsInput.id;
    title: EditCollectionParamsInput.title;
}
/**
 * Edit Bookmark Params Input
 */
export declare namespace EditBookmarkParamsInput {
    /**
     * ID
     */
    type id = any;
    /**
     * Link
     */
    type link = string;
    /**
     * Title
     */
    type title = string;
    /**
     * collection ID
     */
    type collectionId = any | null;
}
export interface EditBookmarkParamsInput {
    id: EditBookmarkParamsInput.id;
    link: EditBookmarkParamsInput.link;
    title: EditBookmarkParamsInput.title;
    collectionId: EditBookmarkParamsInput.collectionId;
}
/**
 * Delete Collection Params Input
 */
export declare namespace DeleteCollectionParamsInput {
    /**
     * ID
     */
    type id = any;
}
export interface DeleteCollectionParamsInput {
    id: DeleteCollectionParamsInput.id;
}
/**
 * Delete Bookmark Params Input
 */
export declare namespace DeleteBookmarkParamsInput {
    /**
     * ID
     */
    type id = any;
}
export interface DeleteBookmarkParamsInput {
    id: DeleteBookmarkParamsInput.id;
}
/**
 * Change Bookmark's Collection Params Input
 */
export declare namespace ChangeBookmarksCollectionParamsInput {
    /**
     * bookmark ID
     */
    type bookmarkId = any;
    /**
     * collection ID
     */
    type collectionId = any | null;
}
export interface ChangeBookmarksCollectionParamsInput {
    bookmarkId: ChangeBookmarksCollectionParamsInput.bookmarkId;
    collectionId: ChangeBookmarksCollectionParamsInput.collectionId;
}
export declare namespace Mutation {
    /**
     * Registers user. Returns his identifier
     */
    type register = User;
    /**
     * Creates Collection
     */
    type createCollection = Collection;
    namespace createCollection {
        interface Arguments {
            params: CreateCollectionParamsInput;
        }
    }
    /**
     * Creates Bookmark
     */
    type createBookmark = Bookmark;
    namespace createBookmark {
        interface Arguments {
            params: CreateBookmarkParamsInput;
        }
    }
    /**
     * Edits Collection
     */
    type editCollection = Collection;
    namespace editCollection {
        interface Arguments {
            params: EditCollectionParamsInput;
        }
    }
    /**
     * Edits Bookmark
     */
    type editBookmark = Bookmark;
    namespace editBookmark {
        interface Arguments {
            params: EditBookmarkParamsInput;
        }
    }
    /**
     * Deletes Collection
     */
    type deleteCollection = boolean;
    namespace deleteCollection {
        interface Arguments {
            params: DeleteCollectionParamsInput;
        }
    }
    /**
     * Deletes Bookmark
     */
    type deleteBookmark = boolean;
    namespace deleteBookmark {
        interface Arguments {
            params: DeleteBookmarkParamsInput;
        }
    }
    /**
     * Changes Bookmark's Collection
     */
    type changeBookmarksCollection = Bookmark;
    namespace changeBookmarksCollection {
        interface Arguments {
            params: ChangeBookmarksCollectionParamsInput;
        }
    }
}
export interface Mutation {
    register: Mutation.register;
    createCollection: Mutation.createCollection;
    createBookmark: Mutation.createBookmark;
    editCollection: Mutation.editCollection;
    editBookmark: Mutation.editBookmark;
    deleteCollection: Mutation.deleteCollection;
    deleteBookmark: Mutation.deleteBookmark;
    changeBookmarksCollection: Mutation.changeBookmarksCollection;
}
export declare namespace Subscription {
    /**
     * Subscribes for current user information updates
     */
    type user = User | null;
}
export interface Subscription {
    user: Subscription.user;
}
declare const schema: string;
export default schema;
