import { PathGraphQL } from "@/config";
import studentClassesService from "./service";
import { GraphQLModule } from "@/config/interface";

const StudentClassModule: GraphQLModule = {
    type: `#graphql
        type StudentClass {
            _id: ID 
            classId: Class
            studentId: Student
            endDate: Float
            startDate: Float
            isActive: Boolean
            isDeleted: Boolean
            note: String
            type: String
        }
        type StudentClasses {
            data: [StudentClass]
            limit: Int
            page: Int
            count: Int
            totalPage: Int
        }
        type InsertedStudentsIntoClass {
            studentIds: [String]
        }
        type CountStudentInClass {
            classId: ID
            count: Int
        }
        input StudentClassesFilter {
            classId: String
        }
        input CountStudentInClassInput {
            classIds: [String]
        }
        input StudentClassesFilterInput {
            pagination: PaginationInput
            filter: StudentClassesFilter
        }
        input AddStudentsToClassInput {
            classId: String!
            studentIds: [String!]!
        }
    `,
    mutation: `#graphql
        ${PathGraphQL.addStudentsIntoClass}(payload: AddStudentsToClassInput!): InsertedStudentsIntoClass
    `,
    query: `#graphql
        ${PathGraphQL.studentClasses}(payload: StudentClassesFilterInput): StudentClasses
        ${PathGraphQL.countStudentInClass}(payload: CountStudentInClassInput!): [CountStudentInClass]
    `,
    resolvers: studentClassesService
};

export default StudentClassModule;