import { readFileSync } from 'fs';

import glob from 'glob';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from '../resolvers';

export const typeDefs = glob
	.sync('**/*.graphql', { cwd: __dirname })
	.map((src: string) => readFileSync(require.resolve(`./${src}`), 'utf8'));

export const schema = makeExecutableSchema({ typeDefs, resolvers });
