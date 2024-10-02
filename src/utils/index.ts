import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { decentralization, PathGraphQL, Role } from '@/config';
import { Action, ContextService, DTO, Obj } from '@/config/interface';

const token = {
    generateToken: (payload: { email: string, accountId: string, phoneNumber: string, role: Role }) => {
        const SECRET_KEY = process.env.SECRET_KEY;
        const EXPIRESIN = process.env.ENV === 'DEV' ? process.env.EXPIRESIN : 60 * 5;
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: Number(EXPIRESIN)
        });
        return token;
    },
    verify: (token: string) => {
        try {
            const SECRET_KEY = process.env.SECRET_KEY;
            const crrToken = jwt.verify(token, SECRET_KEY);
            return {
                data: crrToken,
                message: 'SUCCESS'
            };
        } catch (error) {
            return {
                data: null,
                message: error.message
            };
        }
    }
}
const getScopeQuery = (accessToken: string) => {
    return token.verify(accessToken);
}
const generateUniqueNumericId = (length = 10) => {
    const hash = crypto.randomUUID();

    const numericId = parseInt(hash, 16).toString().slice(0, length);
    return numericId.padStart(length, '0');
};
const createServiceGraphQL = (callback: (parent: any, args: DTO<Obj>, context: ContextService, info: Obj) => any) => {
    return async (parent: any, args: DTO<Obj>, context: ContextService, info: Obj) => {
        if (!decentralization[context.path as PathGraphQL].active) throw new GraphQLError('Inactive action!');
        if (context.path !== info.path?.key) {
            throw new GraphQLError('Path is not match!');
        }
        return callback(parent, args, context, info);
    }
}
const checktIsTypeAction = (value: Action): boolean => {
    const typeActions: Action[] = ['All', 'Create', 'Delete', 'Read', 'Update'];
    return typeActions.includes(value);
}
const duplicateData = (error: any) => {
    if (!!error.code && error.code === 11000) {
        let keyDuplicate: string = Object.keys(error.keyPattern as Obj).join(' and ');
        throw new GraphQLError(`${keyDuplicate} already exist!`);
    }
}
export type CreateServiceGraplQL = ReturnType<typeof createServiceGraphQL>;
export {
    token,
    getScopeQuery,
    generateUniqueNumericId,
    createServiceGraphQL,
    checktIsTypeAction,
    duplicateData
}