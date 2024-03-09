const { tables, queries } = require('./db');
const { uncapitalizeProps } = require('./utils');
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
    this.id = await tables.Users.insert(this);
    return this;
  }

  async update() {
    await tables.Users.update(this);
    return this;
  }

  async delete() {
    await tables.Users.delete(this);
    return this;
  }

  static async getById(id) {
    const user = await tables.Users.select({ Id: id });
    if (!user) return null;
    return new User(uncapitalizeProps(user));
  }

  static async getByLogin(login) {
    const user = await queries.GetUserByLogin.run({login});
    if (!user) return null;
    return new User(uncapitalizeProps(user));
  }

  static async validateAndGet(login, password) {
    const user = await User.getByLogin(login);
    const result = await bcrypt.compare(password, user.password);
    return result ? user : null;
  }
}
