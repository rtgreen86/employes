const Entity = require('./Entity');
const { tables } = require('./db');
const { capitalizeProps } = require('./utils');

module.exports = class Employee extends Entity {
  async save() {
    if (this.id) return this.update();
    this.id = await tables.Employees.insert(capitalizeProps(this));
    return this;
  }

  async update() {
    await tables.Employees.update(capitalizeProps(this));
    return this;
  }

  async delete() {
    await tables.Employees.delete({ Id: this.id });
    return this;
  }

  static async getById(id) {
    return new Employee(await tables.Employees.select({ Id: id }));
  }

  static async getList() {
    return (await tables.Employees.selectAll()).map((props) => new Employee(props));
  }
}
