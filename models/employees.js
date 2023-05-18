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

exports.getEmployees = function getEmployees() {
  return employees;
}
