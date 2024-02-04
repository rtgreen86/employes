const fs = require('node:fs/promises');
const path = require('node:path');
const db = require('../db');

module.exports = class CreateDatabase {
  #db = db;

  #pathToSql = path.join(__dirname, '..', 'initdb.sql');

  async execute() {
    const sql = await fs.readFile(this.#pathToSql, 'utf8');
    await this.#db.exec(sql);
  }
}
