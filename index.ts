import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { GraphQLError } from 'graphql';
dotenv.config();
import { startStandaloneServer } from '@apollo/server/standalone';
import InitApollo from '@/utils/graphql';
import checkAuth from '@/utils/ auth';
import { ContextService, Obj } from '@/config/interface';
import { PathGraphQL } from '@/config';

const MONGODB_URL = process.env.MONGODB_URL as string;
const PORT = Number(process.env.PORT) || 8000;

await mongoose.connect(MONGODB_URL);
const server = new ApolloServer(InitApollo);
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }: any) => {
        const token = req.headers.authorization?.split(" ")?.[1];
        const { variables } = req.body as Obj;
        if (!variables.operationName) throw new GraphQLError('Missing operationName!');
        if (!variables.path) throw new GraphQLError('Missing path!');
        const paths = Object.keys(PathGraphQL);
        if (!paths.includes(variables.path)) throw new GraphQLError('Path is not existed!');

        const contextService: ContextService = {
            auth: checkAuth(token, variables.path)
        };
        return contextService
    }
});
console.log(`🚀  Server ready at: ${url}`);
