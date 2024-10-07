import { GraphQLModule } from "@/config/interface";
import schoolYearService from "./service";

const SchoolYearModule: GraphQLModule = {
    query: `#graphql
        schoolYears: [SchoolYear]
    `,
    mutation: ``,
    type: `#graphql
        type SchoolYear {
            _id: ID
            startDate: Float
            endDate: Float
            isDeleted: Boolean
            status: String
            createdAt: Float
            updatedAt: Float
        }
    `,
    resolvers: schoolYearService
}
export default SchoolYearModule;