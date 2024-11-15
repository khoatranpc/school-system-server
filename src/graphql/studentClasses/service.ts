import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, getFieldsQuery, getPaginatedData } from "@/utils";
import { AddStudentsToClassInput, CountStudentInClass, StudentClassesFilterInput } from "./type";
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
                    args.payload.pagination?.page,
                    args.payload.pagination?.limit,
                    {
                        classId: args.payload.filter?.classId
                    },
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
        }),
        [PathGraphQL.countStudentInClass]: createServiceGraphQL(async (_, args: DTO<CountStudentInClass>) => {
            try {
                const { classIds } = args.payload;
                const result = await Promise.all(
                    classIds.map(async (classId) => {
                        const count = await StudentClassModel.countDocuments({
                            classId: classId,
                            isDeleted: false
                        });
                        return { classId, count };
                    })
                );
                return result;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
}

export default studentClassesService;