import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { GraphQLError } from 'graphql';
dotenv.config();
import { startStandaloneServer } from '@apollo/server/standalone';
import InitApollo from '@/utils/graphql';
import checkAuth from '@/utils/ auth';
import { ContextService, Obj } from '@/config/interface';
import { PathGraphQL } from '@/config';
import { checktIsTypeAction } from '@/utils';

const MONGODB_URL = process.env.MONGODB_URL as string;
const PORT = Number(process.env.PORT) || 8000;
console.log(process.env.MONGODB_URL);
await mongoose.connect(MONGODB_URL);
const app = express();
app.use(cors());

const httpServer = http.createServer(app);
const server = new ApolloServer({
    ...InitApollo,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
    context: async ({ req, res }: any) => {
        const token = req.headers.authorization?.split(" ")?.[1];
        const { variables } = req.body as Obj;
        if (!variables.operationName) throw new GraphQLError('Missing operationName!');
        if (!variables.path) throw new GraphQLError('Missing path!');
        if (!variables.action) throw new GraphQLError('Missing action!');
        if (!checktIsTypeAction(variables.action)) throw new GraphQLError('Action is not existed! Action is one of [Create Read Update Delete]');
        const paths = Object.keys(PathGraphQL);
        if (!paths.includes(variables.path)) throw new GraphQLError('Path is not existed!');

        const contextService: ContextService = {
            auth: checkAuth(token, variables.path, variables.action),
            path: variables.path,
            action: variables.action
        };
        return contextService;
    },
});
console.log(`🚀  Server ready at: ${url}`);
