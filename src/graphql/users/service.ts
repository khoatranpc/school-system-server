import { GraphQLError } from "graphql";
import UserModel from "@/models/user";
import { DTO, Obj, Service } from "@/config/interface";
import { PathGraphQL } from "@/config";
import { GetOneUser, User, UserInput } from "./type";
import { createServiceGraphQL } from "@/utils";

const userService: Service = {
    Mutation: {
        [PathGraphQL.createUser]: createServiceGraphQL(async (_, args: DTO<UserInput>, context) => {
            try {
                const getAccInfo = (context.auth as Obj).data;
                const user: User = {
                    ...args.payload
                }
                const createdUser = await UserModel.create(user);
                return createdUser;
            } catch (error) {
                if (!!error.code && error.code === 11000) {
                    let keyDuplicate: string = Object.keys(error.keyPattern as Obj).join(' and ');
                    throw new GraphQLError(`${keyDuplicate} already exist!`);
                }
                throw new GraphQLError(error.message);
            }
        })
    },
    Query: {
        [PathGraphQL.users]: createServiceGraphQL(async () => {
            const users = await UserModel.find();
            return users;
        }),
        [PathGraphQL.getOneUserInfo]: createServiceGraphQL(async (_, args: DTO<GetOneUser>, context) => {
            const getAccInfo = (context.auth as Obj).data;
            const searchPipline = args.payload && Object.keys(args.payload).length ? (args.payload) : ({
                accountId: getAccInfo.accountId
            });
            const crrUser = await UserModel.findOne(searchPipline);
            return crrUser;
        })
    }
}

export default userService;