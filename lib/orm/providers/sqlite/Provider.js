const Connection = require('./Connection');
const utils = require('./utils');

module.exports = class Provider {
  prepareParams = utils.prepareParams;

  constructor(dbconfig = {}) {
    this.connection = new Connection(dbconfig);
  }

  select(sql, ...params) {
    return this.connection.get(sql, ...params);
  }

  selectAll(sql, ...params) {
    return this.connection.all(sql, ...params);
  }

  async insert(sql, ...params) {
    const { lastID } = await this.connection.run(sql, ...params);
    return lastID;
  }

  async delete(sql, ...params) {
    const { changes } = await this.connection.run(sql, ...params);
    return changes;
  }

  async update(sql, ...params) {
    const { changes } = await this.connection.run(sql, ...params);
    return changes;
  }

  async create(sql) {
    await this.connection.run(sql);
  }

  async drop(sql) {
    await this.connection.run(sql);
  }

  exec(sql) {
    return this.connection.exec(sql);
  }
}
