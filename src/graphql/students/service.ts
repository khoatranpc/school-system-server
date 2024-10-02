import StudentModel from "@/models/student";
import bcrypt from 'bcrypt';
import { PathGraphQL } from "@/config";
import { DTO, Service } from "@/config/interface";
import { createServiceGraphQL, duplicateData, generateUniqueNumericId } from "@/utils";
import { StudentInput } from "./type";
import UserModel from "@/models/user";
import AccountModel from "@/models/account";

const studentService: Service = {
    Query: {
        [PathGraphQL.students]: createServiceGraphQL(() => {
            const randomNumber = generateUniqueNumericId();
            console.log(randomNumber);
        })
    },
    Mutation: {
        [PathGraphQL.createStudent]: createServiceGraphQL(async (_, args: DTO<StudentInput>) => {
            const { address, email, name, phoneNumber, dob, identity } = args.payload;
            const hashedPassword = bcrypt.hashSync(email, 10);
            try {
                const createdAccount = await AccountModel.create({
                    email: email.trim(),
                    phoneNumber: phoneNumber.trim(),
                    password: hashedPassword,
                });
                const createdUserInfo = await UserModel.create({
                    accountId: createdAccount._id,
                    address: address?.trim(),
                    dob,
                    email: email?.trim(),
                    identity: identity?.trim(),
                    name: name?.trim(),
                    phoneNumber: phoneNumber?.trim(),
                });
                const randomNumber = generateUniqueNumericId();
                const createdStudent = await StudentModel.create({
                    code: randomNumber,
                    userId: createdUserInfo._id
                });
                return createdStudent;
            } catch (error) {
                duplicateData(error);
            }
        })
    }
}

export default studentService;