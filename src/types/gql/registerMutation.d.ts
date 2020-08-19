import { DocumentNode } from 'graphql';
export declare namespace RegisterMutation {
    interface Arguments {
    }
    type register = {
        isAdmin: register.isAdmin;
        vkUserId: register.vkUserId;
        firstName: register.firstName;
        lastName: register.lastName;
        photo: register.photo;
    };
    namespace register {
        type isAdmin = boolean;
        type vkUserId = number;
        type firstName = string;
        type lastName = string;
        type photo = string;
    }
}
export interface RegisterMutation {
    register: RegisterMutation.register;
}
export declare const registerMutation: DocumentNode;
