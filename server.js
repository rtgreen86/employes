const http = require('node:http');

const employees = require('./controllers/employees');
const notFound = require('./controllers/404');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    employees.handle(req, res);
    return;
  }
  notFound.handle(req, res);
});

server.listen(3000, () => {
  console.log(`Server starts at http://localhost:${server.address().port}`);
});
