import { GraphQLModule } from "@/config/interface";
import schoolYearService from "./service";
import { PathGraphQL } from "@/config";

const SchoolYearModule: GraphQLModule = {
    query: `#graphql
        ${PathGraphQL.schoolYears}(payload: SchoolYearFilter): [SchoolYear]
    `,
    mutation: `#graphql
        ${PathGraphQL.createSchoolYear}(payload: SchoolYearInput!): SchoolYear
    `,
    type: `#graphql
        type SchoolYear {
            _id: ID
            startDate: Float
            endDate: Float
            isDeleted: Boolean
            status: String
            createdAt: Float
            updatedAt: Float
            name: String
        }
        input SchoolYearFilter {
            isDeleted: Boolean
        }
        input SchoolYearInput {
            startDate: Float!
            endDate: Float!
            status: String
            name: String!
        }
    `,
    resolvers: schoolYearService
}
export default SchoolYearModule;