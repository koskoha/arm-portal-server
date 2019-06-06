import { ApolloServer, Config } from 'apollo-server-koa';
import { GraphQLError } from 'graphql';

import { logger } from '../lib/logger';
import { apolloConfig } from '../lib/config';

import { createContext } from './context';
import { schema } from './schema';

export function createApolloServer(opts?: Config): ApolloServer {
	return new ApolloServer({
		schema,
		formatError: (err: GraphQLError) => {
			logger.warn(err.message, err);
			return err;
		},
		context: createContext,
		...apolloConfig,
		...opts
	});
}
