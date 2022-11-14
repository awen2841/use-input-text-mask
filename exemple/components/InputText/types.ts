import React, { InputHTMLAttributes } from 'react';

export type SIZE = 'sm' | 'md' | 'lg';
export type APPEARANCE = 'gray_soft';

export interface IInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
	size?: SIZE;
	appearance?: APPEARANCE;
	label?: string | React.ReactElement;
	subLabel?: string | React.ReactElement;
	error?: string | React.ReactElement;
	renderLeading?: React.ReactElement;
	renderTrailing?: React.ReactElement;
	containerClassName?: string;
	errorClassName?: string;
	subLabelClassName?: string;
	renderLeadingClassName?: string;
	renderTrailingClassName?: string;
	className?: string;
	componentRef?: React.RefObject<HTMLInputElement> | React.Ref<HTMLInputElement>;
	mask?: string;
}

export interface IGetCSSClassesArgs {
	size?: SIZE;
	appearance?: APPEARANCE;
	error?: string | React.ReactElement;
	className?: string;
	containerClassName?: string;
	errorClassName?: string;
	subLabelClassName?: string;
	isRenderLeadingItemExist?: boolean;
	renderLeadingClassName?: string;
	isRenderTrailingItemExist?: boolean;
	renderTrailingClassName?: string;
	mask?: string;
}
