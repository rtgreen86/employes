const { uncapitalizeProps } = require('./utils');

module.exports = class Entity {
  constructor(props) {
    Object.assign(this, uncapitalizeProps(props));
  }
}
