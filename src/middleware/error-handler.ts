import { Context } from 'koa';

export async function errorMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
	try {
		await next();
	} catch (err) {
		const { status = 500, message = 'Internal Service Error' } = err;

		ctx.status = status || 500;
		ctx.body = { error: message };

		ctx.app.emit('error', err, ctx);
	}
}
