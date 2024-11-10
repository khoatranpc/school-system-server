import { GraphQLModule } from "@/config/interface";
import HomeRoomTeacherService from "./service";
import { PathGraphQL } from "@/config";

const HomeroomTeacherModule: GraphQLModule = {
    type: `#graphql
        type HomeroomTeacher {
            classId: Class
            schoolYear: SchoolYear
            teacherId: Teacher
            isActive: Boolean
            isDeleted: Boolean
            createdAt: Float
            updatedAt: Float
        }
        input FilterHomeRoomTeacher {
            searchValue: String
            classId: String
            schoolYearId: String
        }
        input FindHomeRoomTeacher {
            filter: FilterHomeRoomTeacher
            pagination: PaginationInput
        }
        type FoundHomeRoomTeacher {
            data: [HomeroomTeacher]
            limit: Int
            page: Int
            totalPage: Int
            count: Int
        }
    `,
    mutation: ``,
    query: `#graphql
        ${PathGraphQL.homeroomTeachers}(payload: FindHomeRoomTeacher!): FoundHomeRoomTeacher
    `,
    resolvers: HomeRoomTeacherService
}

export default HomeroomTeacherModule;