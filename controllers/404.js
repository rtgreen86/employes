exports.handle = function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 404;
  res.write('404: Not Found');
  res.end();
};
