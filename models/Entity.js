const { uncapitalizeProps } = require('./utils');

module.exports = class Entity {
  id;

  constructor(props) {
    Object.assign(this, uncapitalizeProps(props));
  }

  save() {
    if (!this.id) return this.create();
    return this.update();
  }

  create() {
    return this;
  }

  update() {
    return this;
  }

  delete() {
    return this;
  }
}
