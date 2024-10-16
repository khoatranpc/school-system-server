import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { PathGraphQL, Role } from "@/config";
import AccountModel from "@/models/account";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, duplicateData, getFieldsQuery, getPaginatedData } from "@/utils";
import { CreateTeacherInput, TeachersFilterInput } from "./type";
import { GraphQLError } from "graphql";
import UserModel from '@/models/user';
import TeacherModel from '@/models/teacher';

const teacherService: Service = {
    Mutation: {
        [PathGraphQL.createTeacher]: createServiceGraphQL(async (_, args: DTO<CreateTeacherInput>) => {
            const session = await mongoose.startSession();
            session.startTransaction(); // Bắt đầu transaction
            try {
                const trimmedEmail = args.payload.email.trim();
                const trimmedPhoneNumber = args.payload.phoneNumber.trim();

                const [existedAccount, existedUser] = await Promise.all([
                    AccountModel.findOne({ email: trimmedEmail }),
                    UserModel.findOne({ email: trimmedEmail })
                ]);
                if (!args.payload.email) throw new GraphQLError('Email is required!');
                if (!args.payload.phoneNumber) throw new GraphQLError('Phone number is required!');
                const hashedPassword = bcrypt.hashSync(trimmedPhoneNumber as string, 10);
                const accountId = existedAccount?._id || (await AccountModel.create({
                    email: trimmedEmail,
                    phoneNumber: trimmedPhoneNumber,
                    password: hashedPassword,
                    role: Role.TEACHER
                }))._id;

                const userId = existedUser?._id || (await UserModel.create({
                    accountId,
                    role: Role.TEACHER,
                    dob: new Date(args.payload.dob as number),
                    address: args.payload.address,
                    name: args.payload.name,
                    email: trimmedEmail,
                    identity: args.payload.identity.trim(),
                    phoneNumber: trimmedPhoneNumber,
                }))._id;

                const existedTeacher = await TeacherModel.findOne({ userId });
                if (existedTeacher) throw new Error('This teacher already exists!');

                const createdTeacher = await TeacherModel.create({
                    degrees: args.payload.degrees,
                    userId,
                    teacherPositionsId: args.payload.teacherPositionsId
                });
                await session.commitTransaction();
                session.endSession();
                return createdTeacher;
            } catch (error) {
                if (session.inTransaction()) {
                    await session.abortTransaction();
                }
                session.endSession();
                duplicateData(error);
                throw new GraphQLError(error.message);
            }
        })
    },
    Query: {
        [PathGraphQL.teachers]: createServiceGraphQL(async (_, args: DTO<TeachersFilterInput>, __, info) => {
            try {
                const fields = getFieldsQuery(info);
                const results = await getPaginatedData(TeacherModel,
                    args.payload?.pagination?.page,
                    args.payload?.pagination?.limit,
                    args.payload?.filter,
                    'userId teacherPositionsId',
                    fields
                );
                return results;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    }
};

export default teacherService;