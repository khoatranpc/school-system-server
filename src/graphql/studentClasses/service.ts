import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, getFieldsQuery, getPaginatedData } from "@/utils";
import { StudentClassesFilterInput } from "./type";
import StudentClassModel from "@/models/studentClass";

const studentClassesService: Service = {
    Mutation: {},
    Query: {
        [PathGraphQL.studentClasses]: createServiceGraphQL(async (_, args: DTO<StudentClassesFilterInput>, __, info) => {
            try {
                const fields = getFieldsQuery(info);
                const result = await getPaginatedData(
                    StudentClassModel,
                    undefined,
                    undefined,
                    undefined,
                    'classId studentId',
                    fields
                );
                return result;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
}

export default studentClassesService;