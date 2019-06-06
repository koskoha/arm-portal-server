import { GraphQLResolveInfo } from 'graphql';
import { createConnection, getConnection } from 'typeorm';

import { Resolver } from '../../src/generated';
import { Context, createContext } from '../../src/graphql/context';

export async function mockContext(): Promise<Context> {
	try {
		await getConnection();
	} catch (e) {
		await createConnection();
	}

	return createContext();
}

type MockResolverFn<TResult, TParent, TArgs, TCtx> = (
	parent?: TParent,
	args?: TArgs,
	context?: TCtx,
	info?: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export function mockResolver<TResult, TParent, TContext, TArgs>(
	resolver: Resolver<TResult, TParent, TContext, TArgs>
): MockResolverFn<TResult, TParent, TArgs, TContext>;
export function mockResolver<TResult, TParent, TContext, TArgs>(
	resolver: Resolver<TResult, TParent, TContext, TArgs>
): MockResolverFn<TResult, TParent, TArgs, TContext> {
	// May be a better way to do this
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return (parent, args, context, info) => resolver(parent!, args!, context!, info!);
}
