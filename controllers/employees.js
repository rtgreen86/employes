const { Buffer } = require('node:buffer');
const querystring = require('node:querystring');
const employees = require('../models/employees');
const template = require('../views/default');

exports.handle = function (req, res) {
  switch(req.method) {
    case 'POST': return handlePost(req, res);
    default: return handleGet(req, res);
  }
}

function handlePost(req, res) {
  const chunks = [];
  req.setEncoding('utf8');
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const query = chunks.join('');
    const employee = querystring.parse(query);
    employees.addEmployee(employee);
    handleGet(req, res);
  });
}

function handleGet(req, res) {
  const emplList = employees.getEmployees();
  const content = template('Employees', formatContent(emplList));
  const contentLength = Buffer.byteLength(content);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', contentLength);
  res.end(content);
}

function formatString(employee) {
  return Object.values(employee).join('\t');
}

function formatContent(employees) {
  return `<a href="/addEmployee">New</a>

${employees.map(item => formatString(item)).join('\n')}`;
}
