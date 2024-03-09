const express = require('express');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

const router = express.Router();

router.get('/', async (req, res) => {
  const employees = await Employee.getList();

  res.render('employees-list', {
    title: 'Employees List',
    employees
  });
});

router.get('/details/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = await Employee.getById(id);
  await employee.getDepartments();

  res.render('employee', {
    title: 'Employee',
    employee,
  })
});

router.get('/edit/:id?', async (req, res) => {
  const id = req.params.id
    ? parseInt(req.params.id, 10)
    : null;

  const employee = id
    ? await Employee.getById(id)
    : {};

  const title = id
    ? 'Edit Employee'
    : 'New Employee';

  const departments = [
    { id: '', name: 'None' },
    ...await Department.list()
  ];

  res.render('employee-form', {
    title,
    employee,
    departments
  });
});

router.post('/edit', async (req, res) => {
  const employee = new Employee({
    id: req.body.id || undefined,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  await employee.save();

  const departments = [];
  const departmentId = parseInt(req.body.department, 10);
  if (!isNaN(departmentId)) {
    departments.push({ id: departmentId });
  }
  await employee.getDepartments();
  await employee.updateDepartments(departments);

  res.redirect('/employees');
});

router.post('/delete', async (req, res) => {
  await new Employee({
    id: req.body.id,
  }).delete();

  res.redirect('/employees');
});

module.exports = router;
