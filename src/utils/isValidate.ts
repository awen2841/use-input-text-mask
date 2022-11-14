import { Mask } from './types';
import { parsValue } from './conformToMask';
import { isRegExp } from './isRegExp';

export const isValidate = (value: string, mask: Mask): boolean => {
	const _value = parsValue(value, mask);

	const _mask = mask.filter(isRegExp);

	return _mask.length === _value.length;
};
