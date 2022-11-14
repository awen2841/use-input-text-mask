import * as sinon from 'sinon';
import * as selectionRange from './getSelectionRange';
import { Range } from './types';

describe('utils => getSelectionRange.ts', () => {
	test.each`
		range       | expected
		${[0, 0]}   | ${0}
		${[2, 2]}   | ${0}
		${[1, 3]}   | ${0}
		${[3, 3]}   | ${0}
		${[4, 4]}   | ${0}
		${[5, 5]}   | ${1}
		${[6, 6]}   | ${2}
		${[16, 16]} | ${9}
		${[17, 17]} | ${10}
	`('countRegExpInRange range = $range, expected = $expected', ({ range, expected }) => {
		// GIVEN
		const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

		// WHEN
		const data = selectionRange.countRegExpInRange(range, mask);

		// THEN
		expect(data).toEqual(expected);
	});

	test.each`
		prevRange   | expected
		${[0, 0]}   | ${[0, 0]}
		${[1, 1]}   | ${[2, 2]}
		${[3, 3]}   | ${[5, 5]}
		${[8, 8]}   | ${[10, 10]}
		${[13, 13]} | ${[14, 14]}
		${[2, 2]}   | ${[2, 2]}
		${[5, 5]}   | ${[5, 5]}
		${[6, 6]}   | ${[6, 6]}
		${[7, 7]}   | ${[7, 7]}
		${[10, 10]} | ${[10, 10]}
		${[11, 11]} | ${[11, 11]}
		${[12, 12]} | ${[12, 12]}
		${[14, 14]} | ${[14, 14]}
		${[15, 15]} | ${[15, 15]}
		${[16, 16]} | ${[16, 16]}
		${[17, 17]} | ${[17, 17]}
		${[33, 33]} | ${[33, 33]}
	`('normalizePrevRange $prevRange $expected', ({ prevRange, expected }) => {
		// GIVEN
		const mask = ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

		// WHEN
		const data = selectionRange.normalizePrevRange(prevRange, mask);

		// THEN
		expect(data).toEqual(expected);
	});

	describe('getSelectionRange', () => {
		const sandbox = sinon.createSandbox();

		afterEach(() => {
			sandbox.restore();
		});

		test.each`
			prevRange | currentRange
			${null}   | ${null}
			${[0, 0]} | ${null}
			${null}   | ${[0, 0]}
			${[0, 0]} | ${[0, 0]}
			${[3, 3]} | ${[3, 3]}
		`(
			'getSelectionRange when expected === null prevRange = $prevRange, currentRange = $currentRange',
			({ prevRange, currentRange }) => {
				const value = '+1 (111) 2';

				const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

				// WHEN
				const countRegExpInRangeStab = sandbox.stub(selectionRange, 'countRegExpInRange');
				const normalizePrevRangeStab = sandbox.stub(selectionRange, 'normalizePrevRange');

				const data = selectionRange.getSelectionRange(prevRange, currentRange, mask, value);

				// THEN
				expect(data).toEqual(null);
				expect(countRegExpInRangeStab.callCount).toEqual(0);
				expect(normalizePrevRangeStab.callCount).toEqual(0);
			}
		);

		test.each`
			prevRegExpInRange | currentRegExpInRange | expected
			${1}              | ${1}                 | ${[5, 5]}
			${3}              | ${4}                 | ${[5, 5]}
			${6}              | ${7}                 | ${[5, 5]}
			${1}              | ${10}                | ${[5, 5]}
			${3}              | ${12}                | ${[5, 5]}
			${5}              | ${12}                | ${[5, 5]}
			${8}              | ${10}                | ${[5, 5]}
		`(
			'getSelectionRange when return currentRange $prevRegExpInRange, $currentRegExpInRange, $expected',
			({ prevRegExpInRange, currentRegExpInRange, expected }) => {
				const value = '+1 (111) 2';

				const prevRange: Range = [1, 1];
				const currentRange: Range = [5, 5];

				const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

				// WHEN
				const countRegExpInRangeStab = sandbox.stub(selectionRange, 'countRegExpInRange');

				countRegExpInRangeStab.onCall(0).returns(prevRegExpInRange);
				countRegExpInRangeStab.onCall(1).returns(currentRegExpInRange);

				const normalizePrevRangeStab = sandbox.stub(selectionRange, 'normalizePrevRange');

				const data = selectionRange.getSelectionRange(prevRange, currentRange, mask, value);

				// THEN
				expect(data).toEqual(expected);

				expect(countRegExpInRangeStab.callCount).toEqual(2);
				expect(countRegExpInRangeStab.calledWithExactly(prevRange, mask)).toBeTruthy();
				expect(countRegExpInRangeStab.calledWithExactly(currentRange, mask)).toBeTruthy();
				expect(normalizePrevRangeStab.callCount).toEqual(0);
			}
		);

		test.each`
			prevRange | currentRange | value
			${[3, 3]} | ${[7, 7]}    | ${'+1 (111'}
			${[4, 4]} | ${[10, 10]}  | ${'+1 (111) 2'}
			${[5, 5]} | ${[12, 12]}  | ${'+1 (111) 222'}
			${[5, 5]} | ${[15, 15]}  | ${'+1 (111) 222-33'}
			${[5, 5]} | ${[17, 17]}  | ${'+1 (111) 222-3333'}
		`('getSelectionRange when return prevRange', ({ prevRange, currentRange, value }) => {
			const prevRegExpInRange = 1;
			const currentRegExpInRange = 10;

			const normalizePrevRange: Range = [9, 5];

			const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

			// WHEN
			const countRegExpInRangeStab = sandbox.stub(selectionRange, 'countRegExpInRange');

			countRegExpInRangeStab.onCall(0).returns(prevRegExpInRange);
			countRegExpInRangeStab.onCall(1).returns(currentRegExpInRange);

			const normalizePrevRangeStab = sandbox.stub(selectionRange, 'normalizePrevRange').returns(normalizePrevRange);

			const data = selectionRange.getSelectionRange(prevRange, currentRange, mask, value);

			// THEN
			expect(data).toEqual(normalizePrevRange);

			expect(countRegExpInRangeStab.callCount).toEqual(2);
			expect(countRegExpInRangeStab.calledWithExactly(prevRange, mask)).toBeTruthy();
			expect(countRegExpInRangeStab.calledWithExactly(currentRange, mask)).toBeTruthy();
			expect(normalizePrevRangeStab.calledWithExactly(prevRange, mask)).toBeTruthy();
		});
	});
});
