import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { GraphQLError } from "graphql";
import GradeLevelModel from "@/models/gradeLevel";
import { createServiceGraphQL, duplicateData } from "@/utils";
import { GradeLevelInput } from "./type";

const gradeLevelService: Service = {
    Query: {
        [PathGraphQL.gradeLevels]: createServiceGraphQL(async () => {
            const gradeLevels = await GradeLevelModel.find({});
            return gradeLevels;
        })
    },
    Mutation: {
        [PathGraphQL.createGradeLevel]: createServiceGraphQL(async (_, args: DTO<GradeLevelInput>) => {
            try {
                const newDate = {
                    ...args.payload,
                    name: args.payload.name.trim()
                }
                const createdGradeLevel = await GradeLevelModel.create(newDate);
                return createdGradeLevel;
            } catch (error) {
                duplicateData(error);
                throw new GraphQLError(error.message);
            }
        })
    }
}

export default gradeLevelService