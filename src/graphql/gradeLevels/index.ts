import { GraphQLModule } from "@/config/interface";
import gradeLevelService from "./service";
import { PathGraphQL } from "@/config";

const GradeLevelModule: GraphQLModule = {
    type: `#graphql
        type GradeLevel {
            _id: ID
            level: Int 
            name: String
            des: String
            isActive: String
            createdAt: Float
            updatedAt: Float
        }
        input GradeLevelInput {
            level: Int
            name: String
            des: String
        }
    `,
    mutation: `#graphql
        ${PathGraphQL.createGradeLevel}(payload: GradeLevelInput!): GradeLevel
    `,
    query: `#graphql
        ${PathGraphQL.gradeLevels}: [GradeLevel]
    `,
    resolvers: gradeLevelService
}
export default GradeLevelModule;