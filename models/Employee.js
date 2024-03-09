const Entity = require('./Entity');
const { tables, queries } = require('./db');
const {uncapitalizeProps} = require('./utils');

module.exports = class Employee extends Entity {
  constructor(props) {
    super(props);
    if (!this.departments) this.departments = [];
  }

  async create() {
    this.id = await tables.Employees.insert({
      FirstName: this.firstName,
      LastName: this.lastName,
      Photo: this.photo,
    });
    return super.create();
  }

  async update() {
    await tables.Employees.update({
      Id: this.id,
      FirstName: this.firstName,
      LastName: this.lastName,
      Photo: this.photo
    });
    return super.update();
  }

  async delete() {
    await queries.UnassignAllDepartments.run({ Employee: this.id });
    await tables.Employees.delete({ Id: this.id });
    return super.delete();
  }

  async getDepartments() {
    this.departments = (await queries.GetEmployeeDepartments.run({ Employee: this.id }))
        .map((dep) => uncapitalizeProps(dep));
    return this;
  }

  async assignDepartment(department) {
    this.departments.push(department);
    await tables.DepartmentEmployees.insert({
      Department: department.id,
      Employee: this.id
    });
    return this;
  }

  async unassignDepartment(department) {
    const index = this.departments.findIndex((dep) => dep.id === department.id);
    this.departments.splice(index, 1);
    await tables.DepartmentEmployees.delete({
      Department: department.id,
      Employee: this.id
    });
  }

  async updateDepartments(departments) {
    const removeList = this.departments.filter((dep) => departments.find((_dep) => _dep.id === dep.id) !== null);
    const addList = departments.filter((dep) => this.departments.find((_dep) => _dep.id === dep.id) !== null);
    await Promise.all(removeList.map((dep) => this.unassignDepartment(dep)));
    await Promise.all(addList.map((dep) => this.assignDepartment(dep)));
    return this;
  }

  static async getById(id) {
    return new Employee(await tables.Employees.select({ Id: id }));
  }

  static async getList() {
    return (await tables.Employees.selectAll()).map((props) => new Employee(props));
  }
}
