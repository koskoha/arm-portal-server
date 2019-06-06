import { createLogger, format, transports } from 'winston';

import { config } from './config';

export const logger = createLogger({
	level: config.debugLogging ? 'debug' : 'info',
	format: format.json(),
	transports: [
		new transports.Console({
			format: format.combine(format.colorize(), format.simple())
		})
	]
});
