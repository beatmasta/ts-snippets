// Allow a user role object to contain only one of the roles (admin | user | guest) as a key

type Roles = 'admin' | 'user' | 'guest';

type OnlyOneKeyInObject<T extends string> = {
    [K in T]: {
        [P in K]: boolean;
    } & {
        [Q in Exclude<T, K>]?: never;
    }
}[T];

type UserRole = OnlyOneKeyInObject<Roles>;

const validUserRole1: UserRole = { admin: true };
const validUserRole2: UserRole = { guest: false };

const invalidUserRole1: UserRole = { admin: true, user: false }; // Error: Type '{ admin: boolean; user: boolean; }' is not assignable to type 'UserRole'.
const invalidUserRole2: UserRole = {}; // Error: Type '{}' is not assignable to type 'UserRole'.
