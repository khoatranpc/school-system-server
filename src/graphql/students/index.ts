import { GraphQLModule } from "@/config/interface";
import studentService from "./service";
import { PathGraphQL } from "@/config";

const StudentModule: GraphQLModule = {
    mutation: `#graphql
        ${PathGraphQL.createStudent}(payload: StudentInput!): Student
    `,
    query: `#graphql
        ${PathGraphQL.students}: [Student]
    `,
    type: `#graphql
        type Student {
            code: String
            isActive: Boolean
            isDeleted: Boolean
            userId: User
        }
        input StudentInput {
            name: String !
            phoneNumber: String!
            email: String!
            address: String!
            identity: String 
            dob: Float!
        }
    `,
    resolvers: studentService
}

export default StudentModule;