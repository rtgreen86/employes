const http = require('node:http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World!');
  res.end();
});

server.listen(3000, () => {
  console.log(`Server starts at http://localhost:${server.address().port}`);
});
