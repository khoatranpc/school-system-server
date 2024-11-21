import { GraphQLModule } from "@/config/interface";
import HomeRoomTeacherService from "./service";
import { PathGraphQL } from "@/config";

const HomeroomTeacherModule: GraphQLModule = {
    type: `#graphql
        type HomeroomTeacher {
            _id: ID
            classId: Class
            schoolYearId: SchoolYear
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
            classIds: [String]
            schoolYearIds: [String]
            isActive: Boolean
            isDeleted: Boolean
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
        input SaveHomeRoomTeacher {
            teacherId: String
            classId: String
            schoolYearId: String
            isActive: Boolean
            isDeleted: Boolean
        }
    `,
    mutation: `#graphql
        ${PathGraphQL.savehomeroomteacher}(payload: SaveHomeRoomTeacher!): HomeroomTeacher
    `,
    query: `#graphql
        ${PathGraphQL.homeroomTeachers}(payload: FindHomeRoomTeacher!): FoundHomeRoomTeacher
    `,
    resolvers: HomeRoomTeacherService
}

export default HomeroomTeacherModule;