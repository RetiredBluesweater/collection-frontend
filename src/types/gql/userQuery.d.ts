import { DocumentNode } from 'graphql';
export declare namespace UserQuery {
    interface Arguments {
    }
    type user = {
        isAdmin: user.isAdmin;
        vkUserId: user.vkUserId;
        firstName: user.firstName;
        lastName: user.lastName;
        photo: user.photo;
    } | null;
    namespace user {
        type isAdmin = boolean;
        type vkUserId = number;
        type firstName = string;
        type lastName = string;
        type photo = string;
    }
}
export interface UserQuery {
    user: UserQuery.user;
}
export declare const userQuery: DocumentNode;
