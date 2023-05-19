const { Buffer } = require('node:buffer');
const { URL } = require('node:url');
const querystring = require('node:querystring');
const employees = require('../models/employees');
const template = require('../views/default');

exports.handle = function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}/`);
  const query = url.searchParams.get('search');
  const emplList = employees.getEmployees(query);
  const content = template('Employees', formatContent(query, emplList));
  const contentLength = Buffer.byteLength(content);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', contentLength);
  res.end(content);
}

function formatString(employee) {
  return Object.values(employee).join('\t');
}

function formatContent(query, employees) {
  return `<a href="/addEmployee">New</a>
  <form action="/"><input type="text" name="search" value=${query || ''}><input type="submit" value="search"></form>

${employees.map(item => formatString(item)).join('\n')}`;
}
