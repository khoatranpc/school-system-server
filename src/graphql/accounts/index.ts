import { GraphQLModule } from "@/config/interface";
import accountService from "./service";
import { PathGraphQL } from "@/config";

const AccountModule: GraphQLModule = {
    type: `#graphql
        type Account {
            _id: ID
            email: String
            phoneNumber: String
            password: String
            isDeleted: Boolean
            createdAt: Float
            updatedAt: Float
            role: String
        }
        type Authenticated {
            accessToken: String
        }
        input AccountInput {
            _id: ID
            email: String
            phoneNumber: String
            password: String
        }
        input AuthenticatedInput {
            identifier: String
            password: String 
        }
    `,
    query: `#graphql
         ${PathGraphQL.accounts}: [Account!]
    `,
    mutation: `#graphql
         ${PathGraphQL.createAccount}(payload: AccountInput!): Account!
         ${PathGraphQL.authenticated}(payload: AuthenticatedInput!): Authenticated!
    `,
    resolvers: {
        Query: accountService.Query,
        Mutation: accountService.Mutation
    }
}
export default AccountModule;