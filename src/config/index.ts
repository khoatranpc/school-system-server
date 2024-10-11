import { PathDecentralization } from "./interface";

export const DbCollections = {
    Accounts: 'accounts',
    Users: 'users',
    Students: 'students',
    SchoolYears: 'schoolyears',
    GradeLevel: 'gradelevels',
    Classses: 'classes'
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
    schoolYears = 'schoolYears',
    createSchoolYear = 'createSchoolYear',
    gradeLevels = 'gradeLevels',
    createGradeLevel = 'createGradeLevel',
    classes = 'classes',
    createListClass = 'createListClass'
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
        rolePermissions: {
            ADMIN: ['All'],
            STUDENT: ['Read'],
            TEACHER: ['Read']
        }
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
    },
    schoolYears: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All'],
            STUDENT: ['Read'],
            TEACHER: ['Read']
        }
    },
    createSchoolYear: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    gradeLevels: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All'],
            STUDENT: ['Read'],
            TEACHER: ['Read']
        }
    },
    createGradeLevel: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    },
    classes: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All'],
            STUDENT: ["Read"],
            TEACHER: ['Read']
        }
    },
    createListClass: {
        active: true,
        requiredAuth: true,
        rolePermissions: {
            ADMIN: ['All']
        }
    }
}
