const http = require('node:http');

const server = http.createServer((request, response) => {
  console.log('Request');
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello World!');
  response.end();
});

server.listen(() => {
  const address = server.address();
  console.log('Server started. Open local server on http://localhost:%s/', address.port);
});
