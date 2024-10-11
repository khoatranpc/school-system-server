import { PathGraphQL } from "@/config";
import { DTO, Obj, Service } from "@/config/interface";
import { GraphQLError } from "graphql";
import { createServiceGraphQL, getFieldsQuery } from "@/utils";
import { ClassFilterInput, CreateListClass } from "./type";
import ClassModel from "@/models/classes";

const classService: Service = {
    Mutation: {
        [PathGraphQL.createListClass]: createServiceGraphQL(async (_, args: DTO<CreateListClass>) => {
            try {
                const getListClass = args.payload.classes;

                const bulkOps = getListClass.map((item) => ({
                    updateOne: {
                        filter: { name: item.name, gradeLevelId: item.gradeLevelId, schoolYearId: item.schoolYearId },
                        update: {
                            $set: { isDeleted: !!item.isDeleted, isActive: !item.isDeleted, ...item }
                        },
                        upsert: true // Tạo mới nếu không tìm thấy
                    }
                }));

                await ClassModel.bulkWrite(bulkOps);

                const updatedClasses = await ClassModel.find({
                    name: { $in: getListClass.map((c) => c.name) },
                    gradeLevelId: { $in: getListClass.map((c) => c.gradeLevelId) },
                    schoolYearId: { $in: getListClass.map((c) => c.schoolYearId) }
                });

                return updatedClasses;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    },
    Query: {
        [PathGraphQL.classes]: createServiceGraphQL(async (_, args: DTO<ClassFilterInput>, __, info) => {
            const conditional: Obj = {
                ...args.payload
            };

            delete conditional.limit;
            delete conditional.page;

            const fields = getFieldsQuery(info);
            const limit = (args.payload?.limit ?? 50);
            const page = args.payload?.page ?? 1;
            const totalClass = await ClassModel.countDocuments(conditional);
            const totalPage = Math.ceil(totalClass / limit);
            const skip = (page - 1) * limit;

            const classes = await ClassModel.find({
                ...conditional,
            }, fields.join(' ')).skip(skip).limit(limit).populate(`schoolYearId gradeLevelId`, fields.join(' '));
            return {
                data: classes,
                limit,
                page,
                totalPage,
                count: totalClass
            };
        })
    }
}

export default classService;