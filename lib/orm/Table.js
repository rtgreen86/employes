module.exports = class Table extends require('./Entity') {
  select(...params) {
    return this.executeMethod('select', 'select', ...params);
  }

  selectAll(...params) {
    return this.executeMethod('selectAll', 'selectAll', ...params);
  }

  insert(...params) {
    return this.executeMethod('insert', 'insert', ...params);
  }

  delete(...params) {
    return this.executeMethod('delete', 'delete', ...params);
  }

  update(...params) {
    return this.executeMethod('update', 'update', ...params);
  }

  create(...params) {
    return this.executeMethod('create', 'create', ...params);
  }

  drop(...params) {
    return this.executeMethod('drop', 'drop', ...params);
  }
}
