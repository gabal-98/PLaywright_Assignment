import { EnvConfig } from '../config/env';
import { User, UserType } from '../models';

/** Builds a user of the requested type from the environment configuration. */
export function getUser(type: UserType): User {
    const env = EnvConfig.getInstance();
    return {
        type,
        username: env.usernames[type],
        password: env.password,
    };
}
