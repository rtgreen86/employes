const express = require('express');
const Employee = require('../models/Employee');

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

  res.render('employee', {
    title: 'Employee',
    employee,
  })
});

router.get('/new', async (req, res) => {
  res.render('employee-form', {
    title: 'Add Employee'
  });
});

router.get('/edit/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const employee = await Employee.getById(id);
  res.render('employee-form', {
    title: 'Edit Employee',
    employee,
  });
});

router.post('/save', async (req, res) => {
  await new Employee({
    id: req.body.id || undefined,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  }).save();

  res.redirect('/employees');
});

router.post('/delete', async (req, res) => {
  await new Employee({
    id: req.body.id,
  }).delete();

  res.redirect('/employees');
});

module.exports = router;
