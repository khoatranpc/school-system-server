import { GraphQLModule } from "@/config/interface";
import classService from "./service";
import { PathGraphQL } from "@/config";

const ClassModule: GraphQLModule = {
    type: `#graphql
        type Class {
            _id: ID
            gradeLevelId: GradeLevel
            name: String
            isActive: Boolean
            isDeleted: Boolean
            schoolYearId: SchoolYear
        }
        type ClassFilter {
            data: [Class]
            limit: Int
            page: Int
            totalPage: Int
            count: Int
        }
        input ClassFilterInput {
            gradeLevelId: ID
            name: String
            isActive: Boolean
            isDeleted: Boolean
            schoolYearId: ID
            limit: Int
            page: Int
        }
        input CreateClassInput {
            _id: String
            gradeLevelId: String!
            name: String!
            schoolYearId: String!
            isDeleted: Boolean!
            isActive: Boolean
        }
        input CreateListClassInput {
            classes: [CreateClassInput]!
        }
        input DetailClassInput {
            classId: String!
        }
    `,
    query: `#graphql
        ${PathGraphQL.classes}(payload: ClassFilterInput): ClassFilter
        ${PathGraphQL.detailClass}(payload: DetailClassInput!): Class
    `,
    mutation: `#graphql
         ${PathGraphQL.createListClass}(payload: CreateListClassInput!): [Class]
    `,
    resolvers: classService
}

export default ClassModule;