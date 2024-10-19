import { GraphQLModule } from "@/config/interface";
import studentService from "./service";
import { PathGraphQL } from "@/config";

const StudentModule: GraphQLModule = {
    mutation: `#graphql
        ${PathGraphQL.createStudent}(payload: StudentInput!): Student
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
        input StudentFilter {
            name: String
            phoneNumber: String
            email: String
            identity: String

            # filter 
            classId: String
            schoolYearId: String
            isNotInThisClass: Boolean
        }
        input StudentsInput {
            filter: StudentFilter
            pagination: PaginationInput
        }
        type Students {
            data: [Student]
            limit: Int
            page: Int
            totalPage: Int
            count: Int
        }
    `,
    query: `#graphql
     ${PathGraphQL.students}(payload: StudentsInput): Students
 `,
    resolvers: studentService
}

export default StudentModule;