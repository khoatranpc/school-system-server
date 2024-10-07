import { PathGraphQL } from "@/config";
import { GraphQLError } from "graphql";
import { DTO, Service } from "@/config/interface";
import SchoolYearModel from "@/models/schoolYear";
import { createServiceGraphQL, duplicateData, isFormatNameSchoolYear } from "@/utils";
import { SchoolYearFilter, SchoolYearInput } from "./type";

const schoolYearService: Service = {
    Mutation: {
        [PathGraphQL.createSchoolYear]: createServiceGraphQL(async (_, args: DTO<SchoolYearInput>) => {
            try {
                const getName = args.payload.name;
                const checkName = isFormatNameSchoolYear(getName);
                if (!checkName) throw new GraphQLError('Format name is mismatch (number-number)!');
                const createdSchoolYear = await SchoolYearModel.create(args.payload);
                return createdSchoolYear;
            } catch (error) {
                duplicateData(error);
            }
        })
    },
    Query: {
        [PathGraphQL.schoolYears]: createServiceGraphQL(async (_, args: DTO<SchoolYearFilter>) => {
            const schoolYears = await SchoolYearModel.find({
                isDeleted: args.payload.isDeleted ?? false
            }).sort({
                createdAt: 1
            });
            return schoolYears;
        }),
    }
}
export default schoolYearService;