import { GraphQLError } from "graphql";
import TeacherPositionModel from "@/models/teacherPosition";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, duplicateData } from "@/utils";
import { TeacherPositionFilter } from "./type";

const teacherPositionService: Service = {
    Mutation: {
        [PathGraphQL.createTeacherPosition]: createServiceGraphQL(async (_, args: DTO<TeacherPositionFilter>) => {
            try {
                const data = {
                    ...args.payload
                }
                const createdTeacherPosition = await TeacherPositionModel.create(data);
                return createdTeacherPosition
            } catch (error) {
                duplicateData(error);
                throw new GraphQLError(error.message);
            }
        })
    },
    Query: {
        [PathGraphQL.teacherPositions]: createServiceGraphQL(async (_, args: DTO<TeacherPositionFilter>) => {
            try {
                const conditional = {
                    ...args.payload
                };
                const teacherPositions = await TeacherPositionModel.find(conditional);
                return {
                    data: teacherPositions
                };
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
};

export default teacherPositionService;