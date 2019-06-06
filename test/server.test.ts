import supertest, { SuperTest, Test } from 'supertest';
import { Context } from 'koa';

import { logger } from '../src/lib/logger';
import { startServer } from '../src/server';

describe('server', () => {
	let request: SuperTest<Test>;

	afterEach(() => jest.restoreAllMocks());

	beforeAll(async () => {
		process.env.APOLLO_PLAYGROUND = 'true';
		logger.transports[0].level = 'crit';

		const serverInfo = await startServer(0);
		request = await supertest(serverInfo.server);

		serverInfo.app.use(
			async (ctx: Context, next: () => Promise<void>): Promise<void> => {
				if (ctx.request.url === '/error') {
					throw new Error('Generic Error');
				}

				await next();
			}
		);
	});

	it('should start properly', () =>
		request
			.get('/')
			.set('Accept', 'text/html')
			.expect(404));

	it('should show graphql playground', () =>
		request
			.get('/graphql')
			.set('Accept', 'text/html')
			.expect(200));

	it('should return 500 for generic error', () =>
		request
			.get('/error')
			.set('Accept', 'text/html')
			.expect(500));

	it('should throw if unable to connect to database', () =>
		expect(startServer(0)).rejects.toThrow());
});
