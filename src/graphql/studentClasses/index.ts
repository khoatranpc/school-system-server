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
        input StudentClassesFilter {
            classId: String
        }
        input StudentClassesFilterInput {
            pagination: PaginationInput
            filter: StudentClassesFilter
        }
    `,
    mutation: ``,
    query: `#graphql
        ${PathGraphQL.studentClasses}(payload: StudentClassesFilterInput): StudentClasses
    `,
    resolvers: studentClassesService
};

export default StudentClassModule;