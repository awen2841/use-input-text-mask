import React, { ChangeEvent, useState } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { useInputTextMask } from 'use-input-text-mask';
import { InputText } from '../../components/InputText';

export default {
	title: 'Input',
	parameters: {
		component: InputText,
	},
	decorators: [withKnobs],
};

export const InputPhoneMask = (): JSX.Element => {
	const [inputValue, setInputValue] = useState<string>('');

	const mask = ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

	const { ref: inputRef, maskPlaceholder, onChange, getValue } = useInputTextMask({ mask });

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		onChange(event);

		setInputValue(event.target.value);
	};

	const value = getValue();

	return (
		<div>
			<InputText type="tel" mask={maskPlaceholder} componentRef={inputRef} onChange={handleChange} />
			<p style={{ margin: '8px 0' }}>{`Input value: ${inputValue}`}</p>
			<p style={{ margin: '8px 0' }}>{`CurrentValue: ${value}`}</p>
		</div>
	);
};
