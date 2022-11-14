export function isRegExp(char: string | RegExp): char is RegExp {
	return char instanceof RegExp;
}
