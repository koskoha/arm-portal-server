import assert from 'assert';

export function assertExists<T>(x: T | undefined | null, message?: string): T {
	if (x === null || typeof x === 'undefined') {
		assert.ok(x, message);
		throw new Error();
	}
	return x;
}
