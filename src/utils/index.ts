import { GraphQLError, GraphQLResolveInfo, SelectionNode, SelectionSetNode } from 'graphql';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { decentralization, PathGraphQL, Role } from '@/config';
import { Action, ContextService, DTO, FormatNameSchoolYear, Obj } from '@/config/interface';
import mongoose from 'mongoose';

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
const createServiceGraphQL = (callback: (parent: any, args: DTO<Obj>, context: ContextService, info: GraphQLResolveInfo) => any) => {
    return async (parent: any, args: DTO<Obj>, context: ContextService, info: GraphQLResolveInfo) => {
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
const getFieldsQuery = (info: GraphQLResolveInfo): string[] => {
    const getSelections = (selectionNode?: SelectionSetNode[]) => {
        return selectionNode?.reduce((fields: string[], field: any) => {
            if (field.selectionSet) {
                return fields.concat(field.name.value, ...getSelections(field.selectionSet.selections));
            }
            return fields.concat(field.name.value);
        }, [] as string[]);
    };

    return getSelections(info.fieldNodes[0].selectionSet?.selections as unknown as SelectionSetNode[]);
};
function isFormatNameSchoolYear(value: string): value is FormatNameSchoolYear {
    return /^\d{4,}-\d{4,}$/.test(value);
}
async function getPaginatedData(Model: mongoose.Model<any>, page = 1, limit = 10, query = {}, populate?: any, select?: string[], sortBy?: any) {
    try {
        const skip = (page - 1) * limit;
        const count = await Model.countDocuments(query);
        const data = await Model.find(query, select ?? '')
            .sort(sortBy ?? {
                createdAt: -1
            })
            .skip(skip)
            .limit(limit)
            .populate(populate ?? '', select ?? '')
            .exec();
        const totalPage = Math.ceil(count / limit);

        return {
            page,
            totalPage,
            count,
            data,
            limit
        };
    } catch (error) {
        throw new GraphQLError(error.message);
    }
}
export {
    token,
    getScopeQuery,
    generateUniqueNumericId,
    createServiceGraphQL,
    checktIsTypeAction,
    duplicateData,
    getFieldsQuery,
    isFormatNameSchoolYear,
    getPaginatedData
}