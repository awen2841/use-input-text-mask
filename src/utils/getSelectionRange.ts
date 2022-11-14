import { isEqual, isEmpty, last } from 'lodash';
import { Mask, Range } from './types';
import { isRegExp } from './isRegExp';

export const countRegExpInRange = (range: Range, mask: Mask): number => {
	const [selectionStart] = range;

	const _mask = mask.slice(0, selectionStart);

	return _mask.filter(isRegExp).length;
};

export const normalizePrevRange = (prevRange: Range, mask: Mask): Range => {
	const [selectionStart] = prevRange;

	const _mask = mask.slice(0, selectionStart);

	if (isEmpty(_mask)) {
		return prevRange;
	}

	const lastChar = last(_mask);

	if (lastChar && !isRegExp(lastChar)) {
		const regExpIndex = mask.slice(selectionStart, mask.length).findIndex(isRegExp);

		if (regExpIndex !== -1) {
			const nextRegExpIndex = selectionStart + regExpIndex + 1;

			return [nextRegExpIndex, nextRegExpIndex];
		}
	}

	return prevRange;
};

export const getSelectionRange = (
	prevRange: Range | null,
	currentRange: Range | null,
	mask: Mask,
	value: string
): Range | null => {
	if (!prevRange || !currentRange) {
		return null;
	}

	if (isEqual(prevRange, currentRange)) {
		return null;
	}

	const prevRegExpInRange = countRegExpInRange(prevRange, mask);
	const currentRegExpInRange = countRegExpInRange(currentRange, mask);

	if (currentRegExpInRange === prevRegExpInRange || currentRegExpInRange - prevRegExpInRange === 1) {
		return currentRange;
	}

	const sizeValue = value.length;
	const [selectionStart, selectionEnd] = currentRange;

	if (selectionStart === sizeValue && selectionEnd === sizeValue) {
		return normalizePrevRange(prevRange, mask);
	}

	return currentRange;
};
