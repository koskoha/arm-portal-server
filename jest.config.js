const jestConf = {
	// eslint-disable-next-line global-require
	name: require('./package.json').name,
	testEnvironment: 'node',
	roots: ['<rootDir>/test/'],
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80
		}
	},
	coverageReporters: ['text', 'text-summary', 'html']
};

if (process.argv.some(x => x === '--watch' || x === '--watchAll')) {
	jestConf.roots.push('<rootDir>/src/');
}

module.exports = jestConf;
