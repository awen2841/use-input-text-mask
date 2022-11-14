const createGlyphsExportsMap = (filenames, relativePathToIcons) => {
	let output = '';

	filenames.forEach((filename) => {
		const [name, ext] = filename.split('.');

		output += `export { default as ${name.toUpperCase()} } from '../${relativePathToIcons}/${name}.${ext}';\n`;
	});

	return output;
};

module.exports = { createGlyphsExportsMap };
