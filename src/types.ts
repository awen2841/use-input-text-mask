import { ChangeEventHandler, RefObject } from 'react';
import { Mask } from './utils';

export interface IUseInputTextMask {
	ref: RefObject<HTMLInputElement>;
	maskPlaceholder: string;
	currentMask: Mask;
	onChange: ChangeEventHandler<HTMLInputElement>;
	setValue: (value: string) => void;
	getValue: () => string;
	setMask: (mask: Mask) => void;
}

export interface IOptions {
	mask: Mask;
	placeholderChar?: string;
}
