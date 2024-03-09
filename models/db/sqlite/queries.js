const { QuerySelectAll, QuerySelect, QueryDelete } = require('../../../lib/orm');
const provider = require('./provider');

exports.GetUserByLogin = new QuerySelect(provider, 'SELECT * FROM Users WHERE Login = $Login');

exports.GetEmployeeDepartments = new QuerySelectAll(
    provider,
    `SELECT Id, Name 
        FROM Departments, DepartmentEmployees
        WHERE
            DepartmentEmployees.Employee = $Employee AND
            Departments.Id = DepartmentEmployees.Department`
);

exports.UnassignAllDepartments = new QueryDelete(
    provider,
    'DELETE FROM DepartmentEmployees WHERE Employee = $Employee'
);
