const http = require('node:http');


const server = http.createServer(async (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('OK');
  response.end();
});

server.listen(3000, () => {
  const address = server.address();
  console.log('Server started. Open local server on http://localhost:%s/', address.port);
});
