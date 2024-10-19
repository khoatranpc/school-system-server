import { CreateServiceGraplQL } from '@/utils';
import { PathGraphQL, Role } from '.';
export interface Obj {
    [k: string]: any;
}

export interface GraphQLModule {
    type: string;
    query: string;
    mutation: string;
    resolvers: {
        Query: Obj;
        Mutation: Obj;
    }
}

export interface DTO<T> {
    payload: T;
}

export type Action = "Read" | "Create" | "Update" | "Delete" | 'All';
export interface ContextService {
    auth?: Obj | string;
    path?: string;
    action?: Action;
}
export interface Service {
    Query: {
        [k in PathGraphQL]?: CreateServiceGraplQL;
    },
    Mutation: {
        [k in PathGraphQL]?: CreateServiceGraplQL;
    },
}

export type Permission = {
    [k in Role]?: Action[];
}
export type PathDecentralization = {
    [k in PathGraphQL]: {
        requiredAuth: boolean;
        rolePermissions: Permission;
        active: boolean;
    };
};

export type FormatNameSchoolYear = `${number}-${number}`;

export enum Degree {
    HighSchool = "HighSchool",
    Associate = "Associate",
    Bachelor = "Bachelor",
    Master = "Master",
    Doctorate = "Doctorate",
    PostDoctorate = "PostDoctorate",
    Professor = "Professor",
    Engineer = "Engineer",
    Other = "Other"
}

export enum TypeStudentInClass {
    Promoted = 'Promoted',
    Demoted = 'Demoted',
    Transfered = 'Transfered',
    Completed = 'Completed',
    Pending = 'Pending'
}

export interface Pagination {
    limit: number;
    page: number;
}