const { Buffer } = require('node:buffer');
const querystring = require('node:querystring');
const { URL } = require('node:url');
const employees = require('../models/employees');
const formTemplate = require('../views/employeeForm');
const pageTemplate = require('../views/default');

exports.handle = function handle(req, res) {
  switch(req.method) {
    case 'GET': return handleGet(req, res);
    case 'POST': return handlePost(req, res);
    default: return badRequest(res);
  }
}

function handleGet(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const rawId = url.searchParams.get('id');
  const id = parseInt(rawId, 10);
  const empl = employees.getEmployee(id);

  if (!empl) {
    notFound(res);
    return;
  }

  const formContent = formTemplate('Employee Detail', '/employee', empl);
  const pageContent = pageTemplate(empl.name, formContent);
  const pageLength = Buffer.byteLength(pageContent);

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', pageLength);
  res.end(pageContent);
}

function handlePost(req, res) {
  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', () => {
    const query = chunks.join('');
    const employee = querystring.parse(query);

    employee.id = parseInt(employee.id, 10);
    employee.birthYear = employee.birthYear && parseInt(employee.birthYear, 10);
    if (isNaN(employee.birthYear)) delete employee.birthYear;
    employee.salary = employee.salary && parseInt(employee.salary, 10);
    if (isNaN(employee.salary)) delete employee.salary;

    const success = employees.updateEmployee(employee);
    if (!success) {
      badRequest(res);
      return;
    }
    res.writeHead(302, {'Location': '/'});
    res.end();
  });
}

function badRequest(res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 400;
  res.write('Bad Request');
  res.end();
}

function notFound(res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('Not Found');
  res.end();
}
