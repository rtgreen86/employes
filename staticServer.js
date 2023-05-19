const { URL } = require('node:url');
const path = require('node:path');
const fs = require('node:fs/promises');
const notFound = require('./controllers/404');

exports.handle = async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}/`);
  const urlPath = path.normalize(url.pathname);
  const filePath = path.join('.', 'public', urlPath);

  try {
    const stat = await fs.stat(filePath);
    const fd = await fs.open(filePath);
    const stream = fd.createReadStream(filePath);

    if (filePath.endsWith('.png')) {
      res.setHeader('Content-Type', 'image/png');
    }
    res.setHeader('Content-Length', stat.size);

    stream.pipe(res);
    stream.on('error', function (err) {
      handleIntErr(res, err);
    });
  } catch (err) {
    if (err.code === 'ENOENT') {
      notFound.handle(req, res);
      return;
    }
    handleIntErr(res, err);
  }
};

function handleIntErr(res, err) {
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.write(err.message);
  res.end();
}


