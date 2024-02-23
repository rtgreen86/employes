const path = require('node:path');

exports.dbconfig = {
  provider: 'sqlite',
  connectionString: path.join(__dirname, 'db', 'db.sqlite'),
  verbose: true,
};
