import { GraphQLError } from "graphql";
import bcrypt from 'bcrypt';
import AccountModel from "@/models/account";
import { DTO, Service } from "@/config/interface";
import { AccountInput } from "./type";

const accountService: Service = {
    Query: {
        accounts: async () => {
            const accounts = await AccountModel.find();
            return accounts;
        },
    },
    Mutation: {
        createAccount: async (_, args: DTO<AccountInput>) => {
            const checkExistedEmail = await AccountModel.findOne({
                email: args.payload.email
            });
            if (!args.payload.email) throw new GraphQLError('Email is required!');
            if (!args.payload.password) throw new GraphQLError('Password is required!');
            if (!args.payload.phoneNumber) throw new GraphQLError('Phone number is required!');
            if (checkExistedEmail) throw new GraphQLError('Email is already existed!');
            const hashedPassword = bcrypt.hashSync(args.payload.password as string, 10);

            const createdAccount = await AccountModel.create({
                email: args.payload.email.trim(),
                phoneNumber: args.payload.phoneNumber.trim(),
                password: hashedPassword
            });
            return createdAccount.toObject();

        }
    }
}
export default accountService;