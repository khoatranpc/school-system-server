import { GraphQLModule } from "@/config/interface";
import userService from "./service";
import { PathGraphQL } from "@/config";

const UserModule: GraphQLModule = {
    type: `#graphql
        type User {
            _id: ID
            name: String
            email: String
            phoneNumner: String
            address: String
            identity: String
            dob: Float
            isDeleted: Boolean
            accountId: String
            role: String
            createdAt: Float
            updatedAt: Float
        }
        input UserInput {
            name: String
            address: String
            identity: String
            dob: Float
            isDeleted: Boolean
            role: String
        }
        input GetUser {
            searchValue: String
        }
    `,
    query: `#graphql
        ${PathGraphQL.users}: [User]
        ${PathGraphQL.getOneUserInfo}(payload: GetUser): User
    `,
    mutation: `#graphql
         ${PathGraphQL.createUser}(payload: UserInput!): User
    `,
    resolvers: userService
}

export default UserModule;