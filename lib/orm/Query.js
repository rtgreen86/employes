module.exports = class Query extends require('./Entity') {
  #method;

  constructor(provider, method, query) {
    super(provider, {query});
    this.#method = method;
  }

  run(...params) {
    return this.executeMethod(this.#method, 'query', ...params);
  }
};
