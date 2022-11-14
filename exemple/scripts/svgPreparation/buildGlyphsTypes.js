const createGlyphsTypes = (filenames) => {
	const specialChar = '_';

	const transformedFilenames = filenames.reduce((acc, filename) => {
		const [name] = filename.split('.');

		const transformValues = () => {
			if (name.includes(specialChar)) {
				const separatedValue = name.split(specialChar);

				return separatedValue.map((item) => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
			}

			return `${name[0].toUpperCase()}${name.slice(1)}`;
		};

		return {
			...acc,
			[`${transformValues()}`]: name,
		};
	}, {});

	return `export const Glyphs = ${JSON.stringify(transformedFilenames, null, 2).replace(/"([^"]+)":/g, '$1:')};\n`;
};

module.exports = { createGlyphsTypes };
