const fs = require('node:fs/promises');
const path = require('node:path');
const provider = require('../provider');
const { Query } = require('../../../../lib/orm');

module.exports = class CreateDatabase {
  async execute() {
    const sql = await fs.readFile(path.join(__dirname, 'CreateDatabase.sql'), 'utf8');
    return new Query(provider, 'exec', sql).run();
  }
}
