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

exports.getEmployees = function getEmployees(query) {
  if (!query || typeof query !== 'string') {
    return employees;
  }
  return employees.filter(item => {
    if (item.name && item.name.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    if (item.title && item.title.toLowerCase().includes(query.toLowerCase())) {
      return true;
    }
    return false;
  });
}

exports.getEmployee = function getEmployee(id) {
  return employees.find(empl => empl.id === id);
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
