import { CSSProperties } from 'react';

export enum ICON_SIZES {
	XS = 'xs', // 16px
	SM = 'sm', // 20px
	MD = 'md', // 24px
	LG = 'lg', // 32px
	XLG = 'xlg', // 40px,
}

export interface IPropsIcon {
	className?: string;
	glyph: string;
	size?: ICON_SIZES;
	style?: CSSProperties;
	onClick?: () => void;
}

export interface IIconCssClasses {
	wrapper: string;
}
