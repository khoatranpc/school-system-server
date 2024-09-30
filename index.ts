import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { startStandaloneServer } from '@apollo/server/standalone';
import InitApollo from '@/utils/graphql';

const MONGODB_URL = process.env.MONGODB_URL as string;
const PORT = Number(process.env.PORT) || 8000;

await mongoose.connect(MONGODB_URL);
const server = new ApolloServer(InitApollo);
const { url } = await startStandaloneServer(server, {
    listen: { port: PORT },
});
console.log(`🚀  Server ready at: ${url}`);
