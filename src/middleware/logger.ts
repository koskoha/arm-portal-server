import { Context } from 'koa';

import { logger } from '../lib/logger';

export async function loggerMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
	const start = new Date().getMilliseconds();

	await next();

	const ms = new Date().getMilliseconds() - start;

	let level = 'info';
	if (ctx.status >= 500) {
		level = 'error';
	} else if (ctx.status >= 400) {
		level = 'warn';
	}

	const { method, originalUrl, status } = ctx;
	logger.log(level, `${method} ${originalUrl} ${status} ${ms}ms`);
}
