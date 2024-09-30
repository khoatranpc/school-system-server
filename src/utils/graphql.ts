import { ApolloServerOptions } from "@apollo/server";
import { GraphQLModule, Obj } from "../config/interface.js";
import AccountModule from "../graphql/accounts/index.js";

const CreateAppolo = (...module: GraphQLModule[]): ApolloServerOptions<{}> => {
    const init: Obj = {
        types: '',
        queries: '',
        mutations: '',
        resolvers: {
            Query: {

            },
            Mutation: {

            }
        }
    }
    module.forEach(({ type, query, mutation, resolvers = {} }) => {
        if (type) init.types += type;
        if (query) init.queries += query;
        if (mutation) init.mutations += mutation;

        Object.assign(init.resolvers.Query, resolvers.Query || {});
        Object.assign(init.resolvers.Mutation, resolvers.Mutation || {});
    });
    init.queries = `#graphql
        ${init.queries ? `
            type Query {
            ${init.queries}
            }
        `: ''}
    `;
    init.mutations = `#graphql
        ${init.mutations ? `
            type Mutation {
            ${init.mutations}
            }
        ` : ''}
    `
    const apolloOptions: ApolloServerOptions<{}> = {
        typeDefs: `#graphql
            ${init.types}
            ${init.queries}
            ${init.mutations}
        `,
        resolvers: init.resolvers,
    }
    return apolloOptions;
}

const InitApollo = CreateAppolo(AccountModule);
export default InitApollo;