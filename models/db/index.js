const { dbconfig } = require('../../config');

if (dbconfig.provider === 'sqlite') {
  Object.assign(exports, require('./sqlite'));
}
