import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Book from './resolvers/Book';
import Mutation from './resolvers/Mutation';
import Query from './resolvers/Query';
import Review from './resolvers/Review';
import User from './resolvers/User';
import Subscription from './resolvers/Subscription';
import prisma from './prisma';
const pubsub = new PubSub();

const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Mutation,
		Subscription,
		User,
		Book,
		Review
	},
	context: {
		db,
		pubsub,
		prisma
	}
});

server.start(() => {
	console.log('The server is up!');
});
