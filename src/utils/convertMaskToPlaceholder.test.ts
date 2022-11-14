import { convertMaskToPlaceholder } from './convertMaskToPlaceholder';

describe('utils => convertMaskToPlaceholder.ts', () => {
	test.each`
		value           | expected
		${''}           | ${'+1 (___) ___-____'}
		${'0'}          | ${'+1 (0__) ___-____'}
		${'09'}         | ${'+1 (09_) ___-____'}
		${'099'}        | ${'+1 (099) ___-____'}
		${'099888'}     | ${'+1 (099) 888-____'}
		${'0998887777'} | ${'+1 (099) 888-7777'}
	`('convertMaskToPlaceholder $value, $expected', ({ value, expected }) => {
		// GIVEN
		const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
		const placeholderChar = '_';

		// WHEN
		const data = convertMaskToPlaceholder(mask, value, placeholderChar);

		// THEN
		expect(data).toBe(expected);
	});
});
