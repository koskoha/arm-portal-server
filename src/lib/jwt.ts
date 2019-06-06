import { promisify } from 'util';

import jwt, { Secret, SignOptions } from 'jsonwebtoken';

import { config } from './config';

const signAsync = promisify<object, Secret, SignOptions, string>(jwt.sign);

export async function sign(message: object, opts?: SignOptions): Promise<string> {
	return signAsync(message, config.jwtSecret, {
		...opts,
		expiresIn: '6h'
		// jwtid: jti,
		// keyid: config.jwtkid,
	});
}
