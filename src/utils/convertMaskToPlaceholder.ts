import { Mask } from './types';
import { isRegExp } from './isRegExp';

export function convertMaskToPlaceholder(mask: Mask, value: string, placeholderChar: string): string {
	const { data } = mask.reduce(
		(acc, current) => {
			if (isRegExp(current)) {
				if (acc.value.length) {
					const [char, ...other] = acc.value;

					return {
						data: `${acc.data}${char || ''}`,
						value: other,
					};
				}

				return {
					...acc,
					data: `${acc.data}${placeholderChar}`,
				};
			}

			return {
				...acc,
				data: `${acc.data}${current || ''}`,
			};
		},
		{ data: '', value: value.split('') }
	);

	return data;
}
