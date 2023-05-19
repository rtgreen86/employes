const { Buffer } = require('node:buffer');
const querystring = require('node:querystring');
const employees = require('../models/employees');
const pageTemplate = require('../views/default');
const formTemplate = require('../views/employeeForm');

exports.handle = function (req, res) {
  switch (req.method) {
    case 'POST': return handlePost(req, res);
    case 'GET': return handleGet(req, res);
    default: return badRequest(res);
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
    res.writeHead(302, {
      'Location': '/'
    });
    res.end();
  });
}

function handleGet(req, res) {
  const formContent = formTemplate('New Employee', '/addEmployee', {
    id: -1,
    name: '',
    birthYear: '',
    salary: '',
    title: ''
  });
  const pageContent = pageTemplate('New Employee', formContent);
  const pageLength = Buffer.byteLength(pageContent);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', pageLength);
  res.end(pageContent);
}

function badRequest(res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 400;
  res.write('Error: Bad request.');
  res.end();
}
