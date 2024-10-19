import { ApolloServerOptions } from "@apollo/server";
import { GraphQLModule, Obj } from "@/config/interface";
import AccountModule from "@/graphql/accounts";
import StudentModule from "@/graphql/students";
import UserModule from "@/graphql/users";
import SchoolYearModule from "@/graphql/schoolYears";
import GradeLevelModule from "@/graphql/gradeLevels";
import ClassModule from "@/graphql/classes";
import TeacherPositionModule from "@/graphql/teacherPositions";
import TeacherModule from "@/graphql/teachers";
import StudentClassModule from "@/graphql/studentClasses";

const CreateApollo = (...module: GraphQLModule[]): ApolloServerOptions<{}> => {
    const init: Obj = {
        types: `#graphql
            input PaginationInput {
                page: Int 
                limit: Int
            }
        `,
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

const InitApollo = CreateApollo(AccountModule,
    UserModule,
    StudentModule,
    SchoolYearModule,
    GradeLevelModule,
    ClassModule,
    TeacherPositionModule,
    TeacherModule,
    StudentClassModule
);
export default InitApollo;