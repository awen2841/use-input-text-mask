import { Mask } from './types';
import { isRegExp } from './isRegExp';

export const getPrefix = (mask: Mask): string => {
	const firstRegExp = mask.findIndex(isRegExp);

	if (firstRegExp < 0) {
		return mask.join('');
	}

	return mask.slice(0, firstRegExp).join('');
};

export const parsValue = (value: string, mask: Mask): string => {
	const prefix = getPrefix(mask);
	const _mask = mask.filter(isRegExp);

	let _value = value;

	if (value.startsWith(prefix)) {
		_value = value.replace(prefix, '');
	}

	if (prefix.startsWith(value)) {
		_value = '';
	}

	const { data } = _mask.reduce(
		(acc, current) => {
			if (!acc.value.length) {
				return acc;
			}

			while (!current.test(acc.value[0]) && !!acc.value.length) {
				acc.value = acc.value.slice(1, acc.value.length);
			}

			const [char, ...other] = acc.value;

			return {
				data: `${acc.data}${char || ''}`,
				value: other,
			};
		},
		{ data: '', value: _value.split('') }
	);

	return data;
};

export const convert = (value: string, mask: Mask): string => {
	const prefix = getPrefix(mask);

	const { data } = mask.reduce(
		(acc, current) => {
			if (!acc.value.length) {
				return acc;
			}

			const [char, ...other] = acc.value;

			if (isRegExp(current)) {
				return {
					data: `${acc.data}${char}`,
					value: other,
				};
			}

			return {
				...acc,
				data: `${acc.data}${current}`,
			};
		},
		{ data: '', value: value.split('') }
	);

	return data || prefix;
};
