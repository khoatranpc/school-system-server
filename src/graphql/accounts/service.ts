import { GraphQLError } from "graphql";
import bcrypt from 'bcrypt';
import AccountModel from "@/models/account";
import { DTO, Service } from "@/config/interface";
import { AccountInput, AuthenticatedInput } from "./type";
import { createServiceGraphQL, token } from "@/utils";
import { PathGraphQL } from "@/config";

const accountService: Service = {
    Query: {
        [PathGraphQL.accounts]: createServiceGraphQL(async () => {
            const accounts = await AccountModel.find();
            return accounts;
        }),
    },
    Mutation: {
        [PathGraphQL.createAccount]: createServiceGraphQL(async (_, args: DTO<AccountInput>) => {
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
        }),
        [PathGraphQL.authenticated]: createServiceGraphQL(async (_, args: DTO<AuthenticatedInput>, __, info) => {
            const crrAccount = await AccountModel.findOne({
                '$or': [
                    {
                        email: args.payload.identifier.trim()
                    },
                    {
                        phoneNumber: args.payload.identifier.trim()
                    }
                ]
            });
            if (!crrAccount) throw new GraphQLError('Email or Phone number or password is invalid!');
            const checkPassword = bcrypt.compareSync(args.payload.password, crrAccount.password);
            if (!checkPassword) throw new GraphQLError('Email or Phone number or password is invalid!');
            const accessToken = token.generateToken({ email: crrAccount.email, accountId: crrAccount._id, phoneNumber: crrAccount.phoneNumber, role: crrAccount.role });
            return {
                accessToken
            }
        })
    }
}
export default accountService;