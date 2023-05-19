module.exports = (title, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  <div><img src="/logo.png" alt="logo" width="200" height="32"></div>
  <pre>${content}</pre>
</body>
</html>`;
