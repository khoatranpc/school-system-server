import { GraphQLModule } from "@/config/interface";
import accountService from "./service";

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
        accounts: [Account!]
    `,
    mutation: `#graphql
        createAccount(payload: AccountInput!): Account!
        authenticated(payload: AuthenticatedInput!): Authenticated!
    `,
    resolvers: {
        Query: accountService.Query,
        Mutation: accountService.Mutation
    }
}
export default AccountModule;