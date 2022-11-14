import { isRegExp } from './isRegExp';

describe('utils => isRegExp.ts', () => {
	test('if char = "+" expected false', () => {
		// GIVEN
		const char = '+';

		// WHEN
		const data = isRegExp(char);

		// THEN
		expect(data).toBe(false);
	});

	test('if char = "/[1-9]/" expected true', () => {
		// GIVEN
		const char = /[1-9]/;

		// WHEN
		const data = isRegExp(char);

		// THEN
		expect(data).toBe(true);
	});
});
