exports.prepareParams = function (...params) {
  return params.map(arg => {
    if (typeof arg !== 'object' || arg === null) {
      return arg;
    }
    return Object.keys(arg).reduce((result, prop) => {
      result['$' + prop] = arg[prop];
      return result;
    }, {});
  });
}
