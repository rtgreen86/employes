const { tables, queries } = require('./db');
const bcrypt = require('bcrypt');

module.exports = class User {
  constructor(user = {}) {
    Object.assign(this, user);
  }

  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return this;
  }

  async save() {
    if (this.id) {
      return this.update();
    }
    await this.hashPassword();
    this.id = await tables.Users.insert({
      Login: this.login,
      Password: this.password,
      FirstName: this.firstName,
      LastName: this.lastName,
    });
    return this;
  }

  async update() {
    await tables.Users.update({
      Id: this.id,
      Login: this.login,
      Password: this.password,
      FirstName: this.firstName,
      LastName: this.lastName,
    });
    return this;
  }

  async delete() {
    await tables.Users.delete({ Id: this.id });
    return this;
  }

  static createFromDb(record) {
    return new User({
      id: record.Id,
      login: record.Login,
      password: record.Password,
      firstName: record.FirstName,
      lastName: record.LastName,
    });
  }

  static async getById(id) {
    const user = await tables.Users.select({ Id: id });
    if (!user) return null;
    return User.createFromDb(user);
  }

  static async getByLogin(login) {
    const user = await queries.getUserByLogin.run({login});
    if (!user) return null;
    return User.createFromDb(user);
  }

  static async validateAndGet(login, password) {
    const user = await User.getByLogin(login);
    const result = await bcrypt.compare(password, user.password);
    return result ? user : null;
  }
}
