import React from 'react';
import classNames from 'classnames/bind';
import { IInputTextProps } from './types';
import { getCSSClasses } from './utils/getCSSClasses';

import css from './InputText.module.scss';

const cx = classNames.bind(css);

const InputTextComponent: React.FC<IInputTextProps> = ({
	id,
	size = 'md',
	appearance = 'gray_soft',
	label,
	subLabel,
	error,
	className,
	componentRef,
	containerClassName,
	errorClassName,
	subLabelClassName,
	renderLeading,
	renderLeadingClassName,
	renderTrailing,
	renderTrailingClassName,
	mask,
	...props
}) => {
	const isRenderLeadingItemExist = !!renderLeading;
	const isRenderTrailingItemExist = !!renderTrailing;

	const {
		_className,
		_containerClassName,
		_subLabelClassName,
		_errorClassName,
		_renderLeadingClassName,
		_renderTrailingClassName,
	} = getCSSClasses({
		size,
		error,
		className,
		appearance,
		isRenderLeadingItemExist,
		isRenderTrailingItemExist,
		subLabelClassName,
		containerClassName,
		errorClassName,
		renderLeadingClassName,
		renderTrailingClassName,
	});

	return (
		<div className={_className}>
			{!!label && (
				<label htmlFor={id}>
					{label}
					{!!subLabel && <span className={_subLabelClassName}>{subLabel}</span>}
				</label>
			)}
			<div className={_containerClassName}>
				{renderLeading && <div className={_renderLeadingClassName}>{React.cloneElement(renderLeading)}</div>}
				<input id={id} className={cx(css.input, className)} ref={componentRef} {...props} />
				{mask && <span className={css.mask_container}>{mask}</span>}
				{renderTrailing && React.cloneElement(renderTrailing, { className: _renderTrailingClassName })}
			</div>
			{error && <p className={_errorClassName}>{error}</p>}
		</div>
	);
};

export default InputTextComponent;
