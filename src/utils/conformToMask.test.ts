import * as sinon from 'sinon';
import * as conformToMask from './conformToMask';

describe('utils => conformToMask.ts', () => {
	describe('normalizeMask', () => {
		test('normalizeMask', () => {
			// GIVEN
			const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
			const expected = '+1 (';

			// WHEN
			const data = conformToMask.getPrefix(mask);

			// THEN
			expect(data).toEqual(expected);
		});

		test('normalizeMask without prefix', () => {
			// GIVEN
			const mask = [/[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
			const expected = '';

			// WHEN
			const data = conformToMask.getPrefix(mask);

			// THEN
			expect(data).toEqual(expected);
		});

		test('normalizeMask without RegExp', () => {
			// GIVEN
			const mask = ['+', '1', ' ', '(', ')'];
			const expected = '+1 ()';

			// WHEN
			const data = conformToMask.getPrefix(mask);

			// THEN
			expect(data).toEqual(expected);
		});
	});

	describe('parsValue', () => {
		const sandbox = sinon.createSandbox();

		afterEach(() => {
			sandbox.restore();
		});

		test.each`
			value                   | expected
			${'+'}                  | ${''}
			${'+1 ('}               | ${''}
			${'+1 '}                | ${''}
			${'123'}                | ${'123'}
			${'1_2*3'}              | ${'123'}
			${'1_2*3+4'}            | ${'1234'}
			${'1 2 3'}              | ${'123'}
			${'1 2 3 4'}            | ${'1234'}
			${'+1 (123) 456-7890'}  | ${'1234567890'}
			${'+1 (123) 456-78909'} | ${'1234567890'}
		`('parsValue value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
			const prefix = '+1 (';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.parsValue(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});
	});

	describe('convert', () => {
		const sandbox = sinon.createSandbox();

		afterEach(() => {
			sandbox.restore();
		});

		test.each`
			value             | expected
			${''}             | ${'+'}
			${'11'}           | ${'+1 (1'}
			${'112'}          | ${'+1 (12'}
			${'1123'}         | ${'+1 (123'}
			${'11234'}        | ${'+1 (123) 4'}
			${'11234567'}     | ${'+1 (123) 456-7'}
			${'112345678901'} | ${'+1 (123) 456-7890'}
		`('convert with phone value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = ['+', /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
			const prefix = '+';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.convert(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});

		test.each`
			value            | expected
			${''}            | ${'+1 ('}
			${'1'}           | ${'+1 (1'}
			${'12'}          | ${'+1 (12'}
			${'123'}         | ${'+1 (123'}
			${'1234'}        | ${'+1 (123) 4'}
			${'1234567'}     | ${'+1 (123) 456-7'}
			${'12345678901'} | ${'+1 (123) 456-7890'}
		`('convert with phone and prefix value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
			const prefix = '+1 (';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.convert(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});

		test.each`
			value        | expected
			${''}        | ${''}
			${'1'}       | ${'1'}
			${'12'}      | ${'12'}
			${'123'}     | ${'12/3'}
			${'1234'}    | ${'12/34'}
			${'1234567'} | ${'12/34/567'}
		`('convert with date value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
			const prefix = '';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.convert(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});

		test.each`
			value      | expected
			${''}      | ${''}
			${'1'}     | ${'1'}
			${'12'}    | ${'12'}
			${'123'}   | ${'123'}
			${'1234'}  | ${'1234'}
			${'12345'} | ${'12345'}
		`('convert zip code value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = [/\d/, /\d/, /\d/, /\d/, /\d/];
			const prefix = '';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.convert(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});

		test.each`
			value                 | expected
			${''}                 | ${''}
			${'1'}                | ${'1'}
			${'12'}               | ${'12'}
			${'123'}              | ${'123'}
			${'1234'}             | ${'1234'}
			${'1234567'}          | ${'1234 567'}
			${'1234567890123456'} | ${'1234 5678 9012 3456'}
		`('convert credit cart value = $value, expected = $expected', ({ value, expected }) => {
			// GIVEN
			const mask = [
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
				' ',
				/\d/,
				/\d/,
				/\d/,
				/\d/,
			];
			const prefix = '';

			// WHEN
			const normalizeMaskStab = sandbox.stub(conformToMask, 'getPrefix').returns(prefix);

			const data = conformToMask.convert(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(normalizeMaskStab.calledOnceWithExactly(mask)).toBeTruthy();
		});
	});
});
