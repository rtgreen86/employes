const http = require('node:http');
const { URL } = require('node:url');
const path = require('node:path');
const fs = require('node:fs/promises');

function getFileType(filePath) {
  const ext = path.extname(filePath);
  switch (ext) {
    case '.html':
    case '.htm':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.ico':
      return 'image/x-icon';
    case '.png':
      return 'image/png';
    case '.js':
      return 'text/javascript';
    default:
      throw new Error('Error: Unsupported file type.');
  }
}

function send500(response, error) {
  response.writeHead(500, { 'Content-Type': 'text/plain' });
  response.write(http.STATUS_CODES[500]);
  response.write('\n');
  response.write(error.message);
  response.end();
}

function send404(response) {
  response.writeHead(400, { 'Content-Type': 'text/plain' });
  response.write(http.STATUS_CODES[404]);
  response.end();
}

function sendFile(response, type, content) {
  response.writeHead(200, { 'Content-Type': type });
  response.end(content);
}

function getLocalPath(urlPath) {
  return path.join('.', 'public', ...urlPath.normalize().split(path.sep));
}

async function serveStatic(response, urlPath) {
  if (urlPath === '/') {
    return serveStatic(response, '/index.html');
  }
  const localPath = getLocalPath(urlPath);
  const type = getFileType(localPath);
  try {
    const content = await fs.readFile(localPath);
    sendFile(response, type, content);
  } catch (err) {
    send404(response);
  }
}

const server = http.createServer(async (request, response) => {
  try {
    console.log('Request', request.url);
    const url = new URL(request.url, `http://${request.headers.host}/`);
    await serveStatic(response, url.pathname);
  } catch (err) {
    send500(response, err);
  }
});

server.listen(3000, () => {
  const address = server.address();
  console.log('Server started. Open local server on http://localhost:%s/', address.port);
});
