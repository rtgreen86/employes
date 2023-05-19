module.exports = (heading, action, employee) => `${heading}

<form method="POST" action="${action}">
  <input type="hidden" name="id" value=${employee.id}>
  <label for="emplName">Name</label>\t<input type="text" id="emplName" name="name" value="${employee.name}"}>
  <label for="title">Title</label>\t<input type="text" id="title" name="title" value="${employee.title}">
  <label for="birthYear">Birth Year</label>\t<input type="number" id="birthYear" name="birthYear" value="${employee.birthYear}">
  <label for="salary">Salary</label>\t<input type="number" id="salary" name="salary" value="${employee.salary}">
  <input type="submit"> <input type="submit" formaction="/deleteEmployee" value="Delete">
</form>`;
