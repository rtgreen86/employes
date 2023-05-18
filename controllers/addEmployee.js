const { Buffer } = require('node:buffer');
const template = require('../views/addEmployee');

exports.handle = function(req, res) {
  const content = template('New Employee');
  const contentLength = Buffer.byteLength(content);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', contentLength);
  res.end(content);
}