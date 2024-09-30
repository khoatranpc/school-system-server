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
        input AccountInput {
            _id: ID
            email: String
            phoneNumber: String
            password: String
        }
    `,
    query: `#graphql
        accounts: [Account!]
    `,
    mutation: `#graphql
        createAccount(payload: AccountInput!): Account!
    `,
    resolvers: {
        Query: accountService.Query,
        Mutation: accountService.Mutation
    }
}
export default AccountModule;