import { DocumentNode } from 'graphql';
import { User } from './schema';
export declare namespace RegisterMutation {
    interface Arguments {
    }
    type register = User;
}
export interface RegisterMutation {
    register: RegisterMutation.register;
}
export declare const registerMutation: DocumentNode;
