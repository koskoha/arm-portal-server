import 'reflect-metadata';
import { Server } from 'http';
import { AddressInfo } from 'net';

import { createConnection } from 'typeorm';
import Koa from 'koa';
import koaHelmet from 'koa-helmet';

import { createApolloServer } from './graphql';
import { config } from './lib/config';
import { logger } from './lib/logger';
import { errorMiddleware } from './middleware/error-handler';
import { loggerMiddleware } from './middleware/logger';

export interface ServerInfo {
	app: Koa;
	server: Server;
}

export async function startServer(port: number = config.port): Promise<ServerInfo> {
	await createConnection().catch(err => {
		logger.error('Could not connect to database', err);
		throw err;
	});

	const app = new Koa();

	app.on('error', (err, ctx) => {
		logger.error('server error', err.stack, ctx);
	});

	app.use(loggerMiddleware);
	app.use(errorMiddleware);
	app.use(koaHelmet());

	const apolloServer = createApolloServer();
	// @TODO Add onHealthCheck && sessionStore
	apolloServer.applyMiddleware({
		app,
		cors: true,
		bodyParserConfig: true,
		path: '/graphql'
	});

	return new Promise((resolve, reject) => {
		const server = app.listen(port, () => {
			server.removeListener('error', reject);

			const address = server.address() as AddressInfo;
			logger.info(`Available at http://localhost:${address.port}${apolloServer.graphqlPath}`);

			resolve({ app, server });
		});
		server.once('error', reject);
	});
}
