import { ForbiddenError } from 'apollo-server-koa';

import { Admin } from '../../../src/models/Admin';
import { Context } from '../../../src/graphql/context';
import { Mutation as adminMutation } from '../../../src/graphql/resolvers/admin';
import { mockContext, mockResolver } from '../../lib/util';

describe('Admin Mutations', () => {
	afterEach(() => jest.restoreAllMocks());

	describe('login', () => {
		let context: Context;

		beforeAll(async () => {
			context = await mockContext();

			jest.spyOn(context.repos.admins, 'findByEmail').mockImplementation(async email => {
				if (email !== 'user@example.com') {
					return;
				}

				const admin = new Admin();
				admin.uuid = '57304534-40FF-491C-B622-69484D236023';
				admin.firstName = 'Valid';
				admin.lastName = 'User';
				admin.password = 'valid-creds';
				await admin.hashPassword();
				return admin;
			});
		});

		it('Should login with valid credentials', async () => {
			const input = { email: 'user@example.com', password: 'valid-creds' };
			await expect(
				mockResolver(adminMutation.login)({}, { input }, context)
			).resolves.toMatchObject({
				accessToken: expect.any(String)
			});
		});

		it('Should throw error with credentials', async () => {
			const input = { email: 'user@example.com', password: 'not-valid' };
			await expect(mockResolver(adminMutation.login)({}, { input }, context)).rejects.toThrow(
				ForbiddenError
			);
		});

		it('Should throw error with invalid user', async () => {
			const input = { email: 'no-user@example.com', password: 'not-valid' };
			await expect(mockResolver(adminMutation.login)({}, { input }, context)).rejects.toThrow(
				ForbiddenError
			);
		});
	});
});
