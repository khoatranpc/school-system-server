export const DbCollections = {
    Accounts: 'accounts',
    Users: 'users'
}

export enum Role {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
    ADMIN = 'ADMIN',
}

export enum PathGraphQL {
    accounts = 'accounts',
    createAccount = 'createAccount',
    authenticated = 'authenticated',
    createUser = 'createUser',
    users = 'users',
    getOneUserInfo = 'getOneUserInfo'
}
