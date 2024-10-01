import { PathGraphQL } from "@/config";
import { GraphQLError } from "graphql";
import { token } from ".";

const pathCheckAuth = [
    PathGraphQL.createUser,
    PathGraphQL.getOneUserInfo
];

const checkAuth = (t: string, path: PathGraphQL): any => {
    if (pathCheckAuth.includes(path)) {
        if (!t) throw new GraphQLError('UNAUTHORIZED', {
            extensions: {
                statusCode: 403,
                code: 'UNAUTHORIZED'
            }
        });
        const verify = token.verify(t);
        if (!verify.data) throw new GraphQLError(verify.message, {
            extensions: {
                code: 'UNAUTHORIZED'
            }
        });
        return verify;
    }

    return '';
}

export default checkAuth;