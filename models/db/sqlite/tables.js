const { Table } = require('../../../lib/orm');
const provider = require('./provider');

exports.employees = new Table(provider, {
  insert: 'INSERT INTO employees (firstName, lastName, photo, notes) VALUES ($firstName, $lastName, $photo, $notes)',
  delete: 'DELETE FROM employees WHERE id = $id',
  select: 'SELECT * FROM employees WHERE id = $id'
});

exports.users = new Table(provider, {
  insert: 'INSERT INTO users (login, password, employee) VALUES ($login, $password, $employee)',
  delete: 'DELETE FROM users WHERE id = $id',
  select: 'SELECT * FROM users WHERE id = $id'
});

exports.departments = new Table(provider, {
  insert: 'INSERT INTO departments (name, description) VALUES ($name, $description)',
  delete: 'DELETE FROM departments WHERE id = $id',
  select: 'SELECT * FROM departments WHERE id = $id'
});

exports.department_employees = new Table(provider, {
  insert: 'INSERT INTO department_employees (department, employee) VALUES ($department, $employee)',
  delete: 'DELETE FROM department_employees WHERE department = $department AND employee = $employee',
  select: 'SELECT * FROM department_employees WHERE department = $department AND employee = $employee'
});

exports.messages = new Table(provider, {
  insert: 'INSERT INTO messages (sender, recipient, date, subject, text) VALUES ($sender, $recipient, $date, $subject, $text)',
  delete: 'DELETE FROM messages WHERE id = $id',
  select: 'SELECT * FROM messages WHERE id = $id'
});

exports.images = new Table(provider, {
  insert: 'INSERT INTO images (owner, date, caption, size, path) VALUES ($owner, $date, $caption, $size, $path)',
  delete: 'DELETE FROM images WHERE id = $id',
  select: 'SELECT * FROM images WHERE id = $id'
});
