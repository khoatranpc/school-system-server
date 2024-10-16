import { PathGraphQL } from "@/config";
import teacherService from "./service";
import { GraphQLModule } from "@/config/interface";

const TeacherModule: GraphQLModule = {
    type: `#graphql
        type Degree {
            type: String
            school: String
            major: String
            year: Int
            isGraduated: Boolean
        }
        type Teacher {
            _id: ID
            userId: User
            isActive: Boolean
            isDeleted: Boolean
            code: String
            startDate: Float
            endDate: Float
            teacherPositionsId: [TeacherPosition]
            degrees: [Degree]
        }
        input DegreeInput {
            type: String
            school: String
            major: String
            year: Int
            isGraduated: Boolean
        }
        input CreateTeacherInput {
            code: String
            startDate: Float
            teacherPositionsId: [String]
            degrees: [DegreeInput]
            name: String!
            email: String!
            phoneNumber: String!
            address: String!
            identity: String!
            dob: Float!
        }
        type Teachers {
            data: [Teacher]
            limit: Int
            page: Int
            totalPage: Int
            count: Int
        }
        input TeacherFilter {
            code: String
            startDate: Float
            teacherPositionsId: [String]
            degrees: [String]
            name: String
            email: String
            phoneNumber: String
            address: String
            identity: String
            dob: Float
            isActive: Boolean
            isDeleted: Boolean     
        }
        input TeachersFilterInput {
            filter: TeacherFilter
            pagination: PaginationInput
        }
    `,
    query: `#graphql
        ${PathGraphQL.teachers}(payload: TeachersFilterInput): Teachers
    `,
    mutation: `#graphql
        ${PathGraphQL.createTeacher}(payload: CreateTeacherInput!): Teacher
    `,
    resolvers: teacherService
}
export default TeacherModule;