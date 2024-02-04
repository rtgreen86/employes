const sqlite = require('./sqlite');

let db;

exports.close = function close() {
  if (db) db.close();
  return Promise.resolve();
}

exports.exec = function exec(sql) {
  return new Promise((resolve, reject) => {
    db.exec(sql, function (error) {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

exports.open = function open(config) {
  if (db) return;
  db = new sqlite.Database(config.connectionString);
  return Promise.resolve();
}
