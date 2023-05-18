const employees = [
  {
    id: 0,
    name: 'Pavel Malokhatko',
    birthYear: 1986,
    salary: 3000,
    title: 'Front End Web Developer'
  },
  {
    id: 1,
    name: 'Nadya Malokhatko',
    birthYear: 1986,
    salary: 3000,
    title: 'Full Stack Developer'
  }
];


let nextId = 2;

exports.getEmployees = function getEmployees() {
  return employees;
}

exports.addEmployee = function (employee) {
  employees.push({
    id: nextId++,
    name: employee.name,
    birthYear: employee.birthYear,
    salary: employee.salary,
    title: employee.title
  });
}
