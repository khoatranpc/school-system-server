import { PathGraphQL } from "@/config";
import { Service } from "@/config/interface";
import SchoolYearModel from "@/models/schoolYear";
import { createServiceGraphQL } from "@/utils";

const schoolYearService: Service = {
    Mutation: {},
    Query: {
        [PathGraphQL.schoolYears]: createServiceGraphQL(async () => {
            const schoolYears = await SchoolYearModel.find({});
            return schoolYears;
        })
    }
}
export default schoolYearService;