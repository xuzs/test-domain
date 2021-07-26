const crypto = require('crypto');
const path = require('path');

function createHash(input, limit = 5) {
  const hash = crypto.createHash('md5');
  hash.update(input);
  return hash.digest('hex').substring(0, limit);
}

function generateScopedName(name, filename) {
  const hash = createHash(filename + name);
  let basename = path.basename(filename, '.less') || path.basename(filename, '.scss');
  if (basename.endsWith('.module')) {
    basename = basename.slice(0, -7);
  }
  if (filename.includes('node_modules')) return name;
  return `${basename}__${name}___${hash}`;
}

module.exports = generateScopedName;
