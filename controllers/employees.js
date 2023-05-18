const { Buffer } = require('node:buffer');
const employees = require('../models/employees');
const template = require('../views/default');

exports.handle = function (req, res) {
  const emplList = employees.getEmployees();
  const content = template('Employees', formatContent(emplList));
  const contentLength = Buffer.byteLength(content);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', contentLength);
  res.end(content)
}

function formatString(employee) {
  return Object.values(employee).join('\t');
}

function formatContent(employees) {
  return `<a href="/addEmployee">New</a>

${employees.map(item => formatString(item)).join('\n')}`;
}
