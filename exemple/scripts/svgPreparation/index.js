const fs = require('fs');
const junk = require('junk');
const buildGlyphsTypes = require('./buildGlyphsTypes');
const buildGlyphsExportMap = require('./buildGlyphsExportMap');
const constants = require('./constants');

(() => {
	fs.readdir(constants.ICONS_ABSOLUTE_FOLDER, (error, filenames) => {
		if (error) {
			console.log(error);
		}

		const filteredFilenames = filenames.filter(junk.not);

		fs.writeFileSync(constants.ICONS_TYPES_OUTPUT, buildGlyphsTypes.createGlyphsTypes(filteredFilenames));

		fs.writeFileSync(
			constants.ICONS_LIST_OUTPUT,
			buildGlyphsExportMap.createGlyphsExportsMap(filteredFilenames, constants.ICONS_RELATIVE_FOLDER)
		);
	});
})();
