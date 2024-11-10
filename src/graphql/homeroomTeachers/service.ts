import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL } from "@/utils";
import { FindHomeRoomTeacher } from "./type";

const HomeRoomTeacherService: Service = {
    Mutation: {},
    Query: {
        [PathGraphQL.homeroomTeachers]: createServiceGraphQL(async (_, args: DTO<FindHomeRoomTeacher>) => {
            try {
                const { filter: { classId, schoolYearId, searchValue }, pagination } = args.payload;
                
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
};

export default HomeRoomTeacherService;