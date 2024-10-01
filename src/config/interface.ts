import jwt from 'jsonwebtoken';
import { PathGraphQL } from '.';
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
export interface ContextService {
    auth?: Obj | string;
}
export interface Service {
    Query: {
        [k in PathGraphQL]?: (parent?: any, args?: DTO<Obj>, context?: ContextService, info?: any) => any;
    },
    Mutation: {
        [k in PathGraphQL]?: (parent?: any, args?: DTO<Obj>, context?: ContextService, info?: any) => any;
    },
}

