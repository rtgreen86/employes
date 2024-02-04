const path = require('node:path');

module.exports = {
  connectionString: path.join(__dirname, 'db', 'db.sqlite'),
  initScript: path.join(__dirname, 'models', 'db', 'sqlite', 'initdb.sql'),
};
