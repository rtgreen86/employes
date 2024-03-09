const { tables } = require('./db');
const { uncapitalizeProps } = require('./utils')

module.exports = class Department {
    static async list() {
        return (await tables.Departments.selectAll()).map((item) => uncapitalizeProps(item))
    }
}
