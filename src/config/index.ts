import { PathDecentralization } from "./interface";

export const DbCollections = {
    Accounts: 'accounts',
    Users: 'users',
    Students: 'students'
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
    getOneUserInfo = 'getOneUserInfo',
    students = 'students',
    createStudent = 'createStudent',
}

export const decentralization: PathDecentralization = {
    accounts: {
        requiredAuth: true,
        active: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    authenticated: {
        requiredAuth: false,
        active: true,
        rolePermissions: {}
    },
    createAccount: {
        active: false,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    createStudent: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    createUser: {
        active: false,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    getOneUserInfo: {
        active: true,
        requiredAuth: true,
        rolePermissions: {}
    },
    students: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    users: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    }
}
