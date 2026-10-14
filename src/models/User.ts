import { UserType } from './UserType';

export interface Credentials {
    username: string;
    password: string;
}

export interface User extends Credentials {
    type: UserType;
}
