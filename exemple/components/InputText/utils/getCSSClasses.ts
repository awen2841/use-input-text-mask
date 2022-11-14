import classNames from 'classnames/bind';
import { IGetCSSClassesArgs } from '../types';
import css from '../InputText.module.scss';

const cx = classNames.bind(css);

export const getCSSClasses = ({
	size,
	error,
	className,
	appearance,
	containerClassName,
	errorClassName,
	subLabelClassName,
	isRenderLeadingItemExist,
	isRenderTrailingItemExist,
	renderLeadingClassName,
	renderTrailingClassName,
}: IGetCSSClassesArgs): {
	_className: string;
	_containerClassName: string;
	_errorClassName: string;
	_subLabelClassName: string;
	_renderLeadingClassName: string;
	_renderTrailingClassName: string;
} => {
	const _className = cx('wrapper', {
		[`wrapper_size_${size}`]: !!size,
		[`wrapper_size_${size}_with_render_leading`]: !!size && isRenderLeadingItemExist,
		[`wrapper_size_${size}_with_render_trailing`]: !!size && isRenderTrailingItemExist,
		[`mask_${size}_with_render_leading`]: !!size,
		[`wrapper_appearance_${!error ? appearance : 'red'}`]: !!appearance,
		[`${className}`]: !!className,
	});

	const _containerClassName = cx('container', {
		[`${containerClassName}`]: !!containerClassName,
	});

	const _errorClassName = cx('error', {
		[`${errorClassName}`]: !!errorClassName,
	});

	const _renderLeadingClassName = cx('leading', {
		[`leading_size_${size}`]: !!size,
		[`${renderLeadingClassName}`]: !!renderLeadingClassName,
	});

	const _renderTrailingClassName = cx('trailing', {
		[`trailing_size_${size}`]: !!size,
		[`${renderTrailingClassName}`]: !!renderTrailingClassName,
	});

	const _subLabelClassName = cx('sub_label', {
		[`${subLabelClassName}`]: !!subLabelClassName,
	});

	return {
		_className,
		_containerClassName,
		_errorClassName,
		_subLabelClassName,
		_renderLeadingClassName,
		_renderTrailingClassName,
	};
};
