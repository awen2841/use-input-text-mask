import classNames from 'classnames';
import { IIconCssClasses, ICON_SIZES } from './types';

import css from './Icon.module.scss';

const cx = classNames.bind(css);

export const getCSSClasses = (size: ICON_SIZES, className: string = ''): IIconCssClasses => {
	const wrapper = cx(css.icon, css[`icon_size_${size}`], {
		[`${className}`]: !!className,
	});

	return { wrapper };
};
