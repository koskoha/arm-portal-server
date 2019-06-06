import bcrypt from 'bcrypt';
import { ForbiddenError } from 'apollo-server-koa';

import { MutationResolvers } from '../../../generated';
import { sign } from '../../../lib/jwt';

export const Mutation: MutationResolvers = {
	async login(parent, { input: { email, password } }, { repos }) {
		const user = await repos.admins.findByEmail(email);

		if (!user) {
			throw new ForbiddenError('Invalid Credentials');
		}

		if (!(await bcrypt.compare(password, user.password))) {
			throw new ForbiddenError('Invalid Credentials');
		}

		const { uuid } = user;

		const message = { uuid };
		const accessToken = await sign(message, { subject: uuid });

		return {
			accessToken
		};
	}
};
