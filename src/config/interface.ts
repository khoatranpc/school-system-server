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
    payload: T
}

export interface Service {
    Query: {
        [k: string]: (parent?: any, args?: DTO<Obj>, context?: any, info?: any) => any;
    },
    Mutation: {
        [k: string]: (parent?: any, args?: DTO<Obj>, context?: any, info?: any) => any;
    },
}
