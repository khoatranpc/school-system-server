import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, getFieldsQuery, getPaginatedData } from "@/utils";
import { AddStudentsToClassInput, StudentClassesFilterInput } from "./type";
import StudentClassModel from "@/models/studentClass";
import ClassModel from "@/models/classes";

const studentClassesService: Service = {
    Mutation: {
        [PathGraphQL.addStudentsIntoClass]: createServiceGraphQL(async (_, args: DTO<AddStudentsToClassInput>) => {
            try {
                const { studentIds, classId } = args.payload;
                const crrClass = await ClassModel.findById(args.payload.classId);
                if (!crrClass) throw new Error('This class is not exist!');
                const bulkOps = studentIds.map(stId => {
                    return {
                        updateOne: {
                            filter: {
                                studentId: stId,
                                classId: classId
                            },
                            update: {
                                '$set': {
                                    isActive: true,
                                    isDeleted: false
                                }
                            },
                            upsert: true
                        }
                    }
                });
                await StudentClassModel.bulkWrite(bulkOps);
                return {
                    studentIds: studentIds
                };
            } catch (error) {
                throw new GraphQLError(error.message);
            }

        })
    },
    Query: {
        [PathGraphQL.studentClasses]: createServiceGraphQL(async (_, args: DTO<StudentClassesFilterInput>, __, info) => {
            try {
                const fields = getFieldsQuery(info);
                const result = await getPaginatedData(
                    StudentClassModel,
                    undefined,
                    undefined,
                    undefined,
                    [
                        {
                            path: 'studentId',
                            populate: {
                                path: 'userId'
                            }
                        },
                        {
                            path: 'classId'
                        }
                    ],
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