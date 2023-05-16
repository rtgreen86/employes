const http = require('node:http');
const path = require('node:path');
const { URL } = require('node:url');
const fs = require('node:fs/promises');

function getFileType(filepath) {
  const ext = path.extname(filepath);
  if (ext === '.html' || ext === '.htm') return 'text/html'
  if (ext === '.css') return 'text/css'
  return 'application/octet-stream';
}

function getFileContent(filepath) {
  const localPath = path.join('public', path.normalize(filepath));
  return fs.readFile(localPath);
}

function sendFile(response, fileType, fileContent) {
  response.writeHead(200, {'Content-Type': fileType});
  response.end(fileContent);
}

function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write(http.STATUS_CODES[404]);
  response.end();
}

async function serveStatic(filepath, response) {
  try {
    const fileType = getFileType(filepath);
    const fileContent = await getFileContent(filepath);
    sendFile(response, fileType, fileContent);
  } catch (err) {
    send404(response);
  }
}

function send500(response, error) {
  console.error(error);
  response.writeHead(500, {'Content-Type': 'text/plain'});
  response.write(http.STATUS_CODES[500]);
  response.end();
}

const data = [
  {
    id: '1',
    name: 'Pavel Malokhatko',
    status: 'Online'
  },
]

function sendList(response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(JSON.stringify(data));
  response.end();
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}/`);

    if (url.pathname === '/list') {
      sendList(response);
      return;
    }

    serveStatic(url.pathname === '/' ? '/index.html' : url.pathname, response)
  } catch (error) {
    send500(response, error);
  }
});

server.listen(3000, () => {
  const address = server.address();
  console.log('Server started. Open local server on http://localhost:%s/', address.port);
});
