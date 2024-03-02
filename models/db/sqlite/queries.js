const { Query } = require('../../../lib/orm');
const provider = require('./provider');

exports.getUserByLogin = new Query(provider, 'select', 'SELECT * FROM Users WHERE Login = $login');
