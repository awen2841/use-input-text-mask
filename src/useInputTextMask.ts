import { ChangeEvent, useRef } from 'react';
import isNull from 'lodash/isNull';
import { DEFAULT_PLACEHOLDER_CHAR } from './constants';
import { convert, parsValue, convertMaskToPlaceholder, getSelectionRange, Mask, Range } from './utils';
import { IOptions, IUseInputTextMask } from './types';

export const useInputTextMask = ({ mask, placeholderChar = DEFAULT_PLACEHOLDER_CHAR }: IOptions): IUseInputTextMask => {
	const ref = useRef<HTMLInputElement | null>(null);

	const _mask = useRef<Mask>(mask);

	const maskPlaceholder = useRef(convertMaskToPlaceholder(mask, '', placeholderChar));

	const getCurrentRange = (): Range | null => {
		if (!ref.current) {
			return null;
		}

		const { selectionStart, selectionEnd } = ref.current;

		if (isNull(selectionStart) || isNull(selectionEnd)) {
			return null;
		}

		return [selectionStart, selectionEnd];
	};

	const setSelectionRange = (prevRange: Range, value: string): void => {
		if (!ref.current) {
			return;
		}

		const currentRange = getCurrentRange();

		const range = getSelectionRange(prevRange, currentRange, _mask.current, value);

		if (range) {
			ref.current.setSelectionRange(...range);
		}

		ref.current.focus();
	};

	const setValue = (value: string): void => {
		if (!ref.current) {
			return;
		}

		const _value = parsValue(value, _mask.current);

		ref.current.value = convert(_value, _mask.current);

		maskPlaceholder.current = convertMaskToPlaceholder(_mask.current, _value, placeholderChar);

		ref.current.focus();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		if (!ref.current) {
			return;
		}

		const prevRange = getCurrentRange();

		setValue(event.target.value);

		if (prevRange) {
			setSelectionRange(prevRange, ref.current.value);
		}
	};

	const getValue = (): string => {
		if (!ref.current) {
			return '';
		}

		return parsValue(ref.current.value, _mask.current);
	};

	const setMask = (mask: Mask): void => {
		_mask.current = mask;

		if (!ref.current) {
			maskPlaceholder.current = convertMaskToPlaceholder(mask, '', placeholderChar);
		} else {
			setValue(ref.current.value);
		}
	};

	return {
		ref,
		maskPlaceholder: maskPlaceholder.current,
		currentMask: _mask.current,
		onChange: handleChange,
		setValue,
		getValue,
		setMask,
	};
};
