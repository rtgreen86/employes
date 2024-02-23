const {dbconfig} = require('../../../config');

if (dbconfig && dbconfig.provider === 'sqlite') {
  const Provider = require('../../../lib/orm/providers/sqlite');
  module.exports = new Provider(dbconfig);
}
