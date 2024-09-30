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
    module.forEach(item => {
        if (item.type) {
            init.types += item.type;
        }
        if (item.query) {
            init.queries += item.query;
        }
        if (item.mutation) {
            init.mutations += item.mutation;
        }
        if (Object.keys(item.resolvers.Query).length) {
            for (const key in item.resolvers.Query) {
                init.resolvers.Query[key] = item.resolvers.Query[key];
            }
        }
        if (Object.keys(item.resolvers.Mutation).length) {
            for (const key in item.resolvers.Mutation) {
                init.resolvers.Mutation[key] = item.resolvers.Mutation[key];
            }
        }
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