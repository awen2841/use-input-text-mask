import * as sinon from 'sinon';
import { isValidate } from './isValidate';
import * as conformToMask from './conformToMask';

describe('utils => isValidate.ts', () => {
	test.each`
		value             | expected
		${'10'}           | ${false}
		${'109'}          | ${false}
		${'1099'}         | ${false}
		${'1099888'}      | ${false}
		${'1099888A777'}  | ${false}
		${'1099888A7777'} | ${true}
		${'10998887777'}  | ${true}
		${'+10'}          | ${false}
		${'+109'}         | ${false}
		${'+1099'}        | ${false}
		${'+1099888'}     | ${false}
		${'+10998887777'} | ${true}
	`('integration test isValidate value = $value, expected = $expected', ({ value, expected }) => {
		// GIVEN
		const mask = ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

		// WHEN
		const data = isValidate(value, mask);

		// THEN
		expect(data).toBe(expected);
	});

	describe('isValidate', () => {
		const sandbox = sinon.createSandbox();

		afterEach(() => {
			sandbox.restore();
		});

		test.each`
			value                  | parsValue        | expected
			${'1 (0'}              | ${'10'}          | ${false}
			${'1 (09'}             | ${'109'}         | ${false}
			${'1 (099'}            | ${'1099'}        | ${false}
			${'1 (099) 888'}       | ${'1099888'}     | ${false}
			${'1099888A777'}       | ${'1099888777'}  | ${false}
			${'1099888A7777'}      | ${'10998887777'} | ${true}
			${'10998887777'}       | ${'10998887777'} | ${true}
			${'+1 (0'}             | ${'10'}          | ${false}
			${'+1 (09'}            | ${'109'}         | ${false}
			${'+1 (099'}           | ${'1099'}        | ${false}
			${'+1 (099) 888'}      | ${'1099888'}     | ${false}
			${'+1 (099) 888-7777'} | ${'10998887777'} | ${true}
		`('isValidate value = $value, expected = $expected', ({ value, parsValue, expected }) => {
			// GIVEN
			const mask = ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

			// WHEN
			const parsValueStab = sandbox.stub(conformToMask, 'parsValue').returns(parsValue);

			const data = isValidate(value, mask);

			// THEN
			expect(data).toBe(expected);

			expect(parsValueStab.calledOnceWithExactly(value, mask)).toBeTruthy();
		});
	});
});
