const config = require('../dbconfig');
const db = require('../models/db/sqlite/db');
const CreateDatabase = require('../models/db/sqlite/commands/CreateDatabase');
const fs = require('node:fs');
const path = require('node:path');

fs.mkdirSync(path.join('__dirname', '..', 'db'), {recursive: true});
db.open(config);
new CreateDatabase().execute().then(() => {
  db.close();
  console.log('OK');
});
