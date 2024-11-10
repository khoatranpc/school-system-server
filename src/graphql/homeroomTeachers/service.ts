import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, getPaginatedData } from "@/utils";
import { FindHomeRoomTeacher, SaveHomeRoomTeacher } from "./type";
import HomeroomTeacherModel from "@/models/homeroomTeacher";

const HomeRoomTeacherService: Service = {
    Mutation: {
        [PathGraphQL.savehomeroomteacher]: createServiceGraphQL(async (_, args: DTO<SaveHomeRoomTeacher>) => {
            try {
                const { classId, isActive, isDeleted, schoolYearId, teacherId } = args.payload;
                const saveHomeroomTeacher = await HomeroomTeacherModel.findOneAndUpdate({
                    teacherId,
                }, {
                    '$set': {
                        schoolYearId,
                        classId,
                        isActive,
                        isDeleted,
                        teacherId
                    }
                }, {
                    upsert: true,
                    new: true
                });
                return saveHomeroomTeacher;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    },
    Query: {
        [PathGraphQL.homeroomTeachers]: createServiceGraphQL(async (_, args: DTO<FindHomeRoomTeacher>) => {
            try {
                const { filter: { classId, schoolYearId }, pagination } = args.payload;
                const results = await getPaginatedData(
                    HomeroomTeacherModel,
                    pagination?.page,
                    pagination?.limit,
                    {
                        classId,
                        schoolYearId
                    },
                    [
                        {
                            path: 'schoolYearId'
                        },
                        {
                            path: 'teacherId',
                            populate: {
                                path: 'userId'
                            }
                        }
                    ],
                );
                return results;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
};

export default HomeRoomTeacherService;