module.exports = (title) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
  <pre>
  Add New Employee
  ----------------

  <form method="POST" action="/">
    <label for="emplName">Name</label>\t<input type="text" id="emplName" name="name">
    <label for="title">Title</label>\t<input type="text" id="title" name="title">
    <label for="birthYear">Birth Year</label>\t<input type="number" id="birthYear" name="birthYear">
    <label for="salary">Salary</label>\t<input type="number" id="salary" name="salary">
    <input type="submit">
  </form>
  </pre>
</body>
</html>`;
