const { Table } = require('../../../lib/orm');
const provider = require('./provider');

exports.Users = new Table(provider, {
  insert: 'INSERT INTO Users (Login, Password, FirstName, LastName) VALUES ($Login, $Password, $FirstName, $LastName)',
  select: 'SELECT * FROM Users WHERE Id = $Id',
  delete: 'DELETE FROM Users WHERE Id = $Id',
});

exports.Employees = new Table(provider, {
  insert: 'INSERT INTO Employees (FirstName, LastName, Photo) VALUES ($FirstName, $LastName, $Photo)',
  select: 'SELECT * FROM Employees WHERE Id = $Id',
  selectAll: 'SELECT * FROM Employees',
  update: 'UPDATE Employees SET FirstName = $FirstName, LastName = $LastName WHERE Id = $Id',
  delete: 'DELETE FROM Employees WHERE Id = $Id',
});

exports.Departments = new Table(provider, {
  insert: 'INSERT INTO Departments (Name, Description) VALUES ($Name, $Description)',
  select: 'SELECT * FROM Departments WHERE Id = $Id',
  delete: 'DELETE FROM Departments WHERE Id = $Id',
  selectAll: 'SELECT * FROM Departments',
});

exports.DepartmentEmployees = new Table(provider, {
  insert: 'INSERT INTO DepartmentEmployees (Department, Employee) VALUES ($Department, $Employee)',
  select: 'SELECT * FROM DepartmentEmployees WHERE Department = $Department AND Employee = $Employee',
  delete: 'DELETE FROM DepartmentEmployees WHERE Department = $Department AND Employee = $Employee',
});

exports.Notes = new Table(provider, {
  insert: 'INSERT INTO Notes (Author, Employee, Date, Text) VALUES ($Author, $Employee, $Date, $Text)',
  select: 'SELECT * FROM Notes WHERE Id = $Id',
  delete: 'DELETE FROM Notes WHERE Id = $Id',
});

exports.Images = new Table(provider, {
  insert: 'INSERT INTO Images (Author, Date, Caption, Size, Path) VALUES ($Author, $Date, $Caption, $Size, $Path)',
  select: 'SELECT * FROM Images WHERE Id = $Id',
  selectAll: 'SELECT * FROM Images',
  delete: 'DELETE FROM Images WHERE Id = $Id',
});
