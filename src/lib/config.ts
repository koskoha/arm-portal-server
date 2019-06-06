import dotenv from 'dotenv';
import { Config as ApolloConfig } from 'apollo-server-koa';

import { assertExists } from './util';

dotenv.config();

export interface Config {
	port: number;
	debugLogging: boolean;
	jwtSecret: string;
}

export const playgroundOpts = {
	settings: {
		'tracing.hideTracingResponse': true
	}
};

export const apolloConfig: ApolloConfig = {
	playground: process.env.APOLLO_PLAYGROUND ? {} : false
};

export const config: Config = {
	port: parseInt(assertExists(process.env.PORT), 10),
	debugLogging: process.env.NODE_ENV === 'development',
	jwtSecret: assertExists(process.env.JWT_SECRET)
};
