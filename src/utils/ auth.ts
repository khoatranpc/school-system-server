import { GraphQLError } from "graphql";
import { Action } from "@/config/interface";
import { decentralization, PathGraphQL, Role } from "@/config";
import { token } from ".";

const pathCheckAuth = Object.keys(decentralization);

const checkAuth = (t: string, path: PathGraphQL, action: Action): any => {
    if (pathCheckAuth.includes(path)) {
        if (!t && decentralization[path].requiredAuth) {
            throw new GraphQLError('UNAUTHORIZED', {
                extensions: {
                    statusCode: 403,
                    code: 'UNAUTHORIZED'
                }
            });
        } else {
            if (t && decentralization[path].requiredAuth) {
                const verify = token.verify(t);
                if (!verify.data) throw new GraphQLError(verify.message, {
                    extensions: {
                        code: 'UNAUTHORIZED'
                    }
                });
                const checkPermission = decentralization[path].rolePermissions[verify.data.role] as Action[];
                if (!checkPermission || !checkPermission.includes(action) && verify.data.role !== Role.ADMIN) throw new GraphQLError('Permission denined!');
                return verify;
            }
        }
    }
    return '';
}

export default checkAuth;