import React from 'react';
import { ICON_SIZES, IPropsIcon } from './types';
import { getCSSClasses } from './utils';

const Icon: React.FC<IPropsIcon> = ({ className, glyph = '', size = ICON_SIZES.MD, style, onClick }): JSX.Element => {
	const { wrapper } = getCSSClasses(size, className);

	return (
		<svg className={wrapper} style={style} onClick={onClick}>
			<use xlinkHref={`#icon-${glyph}`} />
		</svg>
	);
};

export default Icon;
