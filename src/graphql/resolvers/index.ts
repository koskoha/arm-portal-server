import deepmerge from 'deepmerge';
import { GraphQLDateTime } from 'graphql-iso-date';
import { IResolvers } from 'graphql-tools';

import { Resolvers } from '../../generated';
import { assertExists } from '../../lib/util';

import * as admin from './admin';

const scalars = {
	DateTime: assertExists(GraphQLDateTime)
};

const resolvers = deepmerge.all<Resolvers>([scalars, admin]) as IResolvers;

export { resolvers };
