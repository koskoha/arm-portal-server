/* eslint-disable */

import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../graphql/context';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	DateTime: Date;
};

export type LoginInput = {
	/** Email to login with. */
	email: Scalars['String'];
	/** Password of account. */
	password: Scalars['String'];
};

export type LoginPayload = {
	__typename?: 'LoginPayload';
	accessToken: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	login: Maybe<LoginPayload>;
};

export type MutationLoginArgs = {
	input: LoginInput;
};

export type Query = {
	__typename?: 'Query';
	/** The currently authenticated user. */
	viewer: Maybe<User>;
};

export type User = {
	__typename?: 'User';
	/** Universal Unique ID for the User */
	uuid: Scalars['ID'];
	/** User's First Name */
	firstName: Maybe<Scalars['String']>;
	/** User's Last Name */
	lastName: Maybe<Scalars['String']>;
	/** User's E-mail address */
	email: Scalars['String'];
	/** Last Activity of the User */
	lastActivityDate: Maybe<Scalars['DateTime']>;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<
	TResult,
	TParent,
	TContext,
	TArgs
>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
	subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
	resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
	| ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
	| SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
	parent: TParent,
	context: TContext,
	info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
	next: NextResolverFn<TResult>,
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
	Query: {};
	User: User;
	ID: Scalars['ID'];
	String: Scalars['String'];
	DateTime: Scalars['DateTime'];
	Mutation: {};
	LoginInput: LoginInput;
	LoginPayload: LoginPayload;
	Boolean: Scalars['Boolean'];
};

export interface DateTimeScalarConfig
	extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
	name: 'DateTime';
}

export type LoginPayloadResolvers<
	ContextType = Context,
	ParentType = ResolversTypes['LoginPayload']
> = {
	accessToken: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType = ResolversTypes['Mutation']> = {
	login: Resolver<
		Maybe<ResolversTypes['LoginPayload']>,
		ParentType,
		ContextType,
		MutationLoginArgs
	>;
};

export type QueryResolvers<ContextType = Context, ParentType = ResolversTypes['Query']> = {
	viewer: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType = ResolversTypes['User']> = {
	uuid: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
	firstName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	lastName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
	email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
	lastActivityDate: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
	DateTime: GraphQLScalarType;
	LoginPayload: LoginPayloadResolvers<ContextType>;
	Mutation: MutationResolvers<ContextType>;
	Query: QueryResolvers<ContextType>;
	User: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
