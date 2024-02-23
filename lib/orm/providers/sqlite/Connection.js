const sqlite = require('sqlite3');

module.exports = class Connection {
  #dbconfig;

  #connection = null;

  constructor(dbconfig) {
    this.#dbconfig = dbconfig;
  }

  open() {
    return new Promise((resolve, reject) => {
      if (this.#connection) {
        resolve(this);
        return;
      }

      const _sqlite = this.#dbconfig.verbose ? sqlite.verbose() : sqlite;

      this.#connection = new _sqlite.Database(this.#dbconfig.connectionString, (error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(this);
      });
    });
  }

  close() {
    if (this.#connection) {
      this.#connection.close();
      this.#connection = null;
    }
    return this;
  }

  all(sql, ...params) {
    return new Promise((resolve, reject) => {
      if (!this.#connection) {
        reject(new Error('Connection is closed.'));
        return;
      }

      this.#connection.all(sql, ...params, function (error, rows) {
        if (error) {
          reject(error);
          return;
        }

        resolve(rows);
      });
    });
  }

  exec(sql) {
    return new Promise((resolve, reject) => {
      if (!this.#connection) {
        reject(new Error('Connection is closed.'));
        return;
      }

      this.#connection.exec(sql, function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }

  get(sql, ...params) {
    return new Promise((resolve, reject) => {
      if (!this.#connection) {
        reject(new Error('Connection is closed.'));
        return;
      }

      this.#connection.get(sql, ...params, function (error, row) {
        if (error) {
          reject(error);
          return;
        }

        resolve(row);
      });
    });
  }

  run(sql, ...params) {
    return new Promise((resolve, reject) => {
      if (!this.#connection) {
        reject(new Error('Connection is closed.'));
        return;
      }

      this.#connection.run(sql, ...params, function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve(this);
      });
    });
  }
}
