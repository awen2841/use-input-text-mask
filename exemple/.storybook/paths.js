const path = require('path');
const fs = require('fs');

const resolveApp = relativePath => path.resolve(fs.realpathSync(process.cwd()), relativePath);

module.exports = {
  appAlias: {},
};

