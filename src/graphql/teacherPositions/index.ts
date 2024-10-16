import { GraphQLModule } from "@/config/interface";
import teacherPositionService from "./service";
import { PathGraphQL } from "@/config";

const TeacherPositionModule: GraphQLModule = {
    type: `#graphql
        type TeacherPosition {
            _id: ID
            code: String
            name: String
            des: String
            isActive: Boolean
            isDeleted: Boolean
        }

        type DataTeacherPositions {
            data: [TeacherPosition]
        }

        input TeacherPositionFilterInput {
            code: String
            name: String
            des: String
            isActive: Boolean
            isDeleted: Boolean
        }

        input CreateTeacherPositionInput {
            code: String
            name: String
            des: String
            isActive: Boolean
            isDeleted: Boolean
        }
    `,
    query: `#graphql
        ${PathGraphQL.teacherPositions}(payload: TeacherPositionFilterInput): DataTeacherPositions
    `,
    mutation: `#graphql
        ${PathGraphQL.createTeacherPosition}(payload: CreateTeacherPositionInput!): TeacherPosition
    `,
    resolvers: teacherPositionService
};
export default TeacherPositionModule;