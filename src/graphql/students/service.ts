import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import { GraphQLError } from "graphql";
import { PathGraphQL } from "@/config";
import StudentModel from "@/models/student";
import { DTO, Obj, Service } from "@/config/interface";
import { createServiceGraphQL, duplicateData, generateUniqueNumericId, getFieldsQuery, getPaginatedData } from "@/utils";
import { StudentInput, StudentsFitlerInput } from "./type";
import UserModel from "@/models/user";
import AccountModel from "@/models/account";
import StudentClassModel from "@/models/studentClass";
import ClassModel from "@/models/classes";

const studentService: Service = {
    Query: {
        [PathGraphQL.students]: createServiceGraphQL(async (_, args: DTO<StudentsFitlerInput>, ___, info) => {
            try {
                const { classId, isNotInThisClass, schoolYearId, gradeLevelId } = args.payload?.filter ?? {};
                let conditionalFilter = {};

                if (classId && isNotInThisClass && schoolYearId && gradeLevelId) {
                    const listClassInSchoolYearId = await ClassModel.find({
                        schoolYearId: schoolYearId,
                        gradeLevelId: gradeLevelId
                    });
                    const studentClasses = await StudentClassModel.find({
                        classId: {
                            $in: listClassInSchoolYearId.map(cl => cl._id)
                        },
                    });
                    conditionalFilter = {
                        '_id': {
                            '$not': {
                                '$in': studentClasses.map(st => st.studentId)
                            }
                        }
                    }
                }
                const fields = getFieldsQuery(info);
                const result = await getPaginatedData(StudentModel,
                    args.payload?.pagination?.page,
                    args.payload?.pagination?.limit,
                    conditionalFilter,
                    `${fields.includes('userId') ? 'userId' : ''}`,
                    fields);
                return result;
            } catch (error) {
                throw new GraphQLError(error.message);
            }
        })
    },
    Mutation: {
        [PathGraphQL.createStudent]: createServiceGraphQL(async (_, args: DTO<StudentInput>) => {
            const session = await mongoose.startSession();
            session.startTransaction(); // Bắt đầu transaction
            const { address, email, name, phoneNumber, dob, identity } = args.payload;
            try {
                const trimmedEmail = args.payload?.email?.trim();

                const [existedAccount, existedUser] = await Promise.all([
                    AccountModel.findOne({ email: trimmedEmail }),
                    UserModel.findOne({ email: trimmedEmail })
                ]);
                const hashedPassword = bcrypt.hashSync(email, 10);
                const accountId = existedAccount?._id ?? (await AccountModel.create({
                    email: email.trim(),
                    phoneNumber: phoneNumber.trim(),
                    password: hashedPassword,
                }))._id;
                if (existedUser?._id) {
                    const checkExistedStudent = await StudentModel.findOne({
                        userId: existedUser._id
                    });
                    if (checkExistedStudent) throw new GraphQLError('This student already exist!')
                }
                const userId = existedUser?._id ?? (await UserModel.create({
                    accountId: accountId,
                    address: address?.trim(),
                    dob,
                    email: email?.trim(),
                    identity: identity?.trim(),
                    name: name?.trim(),
                    phoneNumber: phoneNumber?.trim(),
                }))._id;

                const randomNumber = generateUniqueNumericId();
                const createdStudent = await StudentModel.create({
                    code: randomNumber,
                    userId: userId
                });
                await session.commitTransaction();
                session.endSession();
                return createdStudent;
            } catch (error) {
                if (session.inTransaction()) {
                    await session.abortTransaction();
                }
                session.endSession();
                duplicateData(error);
                throw new GraphQLError(error.message);
            }
        })
    }
}

export default studentService;