module.exports = class Entity {
  #provider;

  #queries;

  constructor(provider, queries = {}) {
    this.#provider = provider;
    this.#queries = queries;
  }

  #assertMethod(methodName) {
    if (typeof this.#provider[methodName] !== 'function') throw new Error(`Provider does not support method "${methodName}".`);
  }

  #assertQuery(query) {
    if (typeof this.#queries[query] !== 'string') throw new Error(`Entity does not support query "${query}".`);
  }

  #prepareParams(...params) {
    if (typeof this.#provider.prepareParams === 'function') {
      return this.#provider.prepareParams(...params);
    }
    return params;
  }

  executeMethod(method, query, ...params) {
    this.#assertMethod(method);
    this.#assertQuery(query);
    return this.#provider[method](this.#queries[query], ...this.#prepareParams(...params));
  }
};
