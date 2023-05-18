const http = require('node:http');

const template = require('./views/default');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(template('Home', 'Hello World!'));
  res.end();
});

server.listen(3000, () => {
  console.log(`Server starts at http://localhost:${server.address().port}`);
});
