const database = require('../models/db/index');
const {mkdirSync} = require('node:fs');
const {join} = require('node:path');

const {provider, CreateDatabase} = database;

mkdirSync(join('__dirname', '..', 'db'), {recursive: true});
provider.connection.open();
new CreateDatabase().execute().then(() => {
  provider.connection.close();
  console.log('OK');
});
