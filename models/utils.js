exports.capitalize = function capitalize(value) {
  return value[0].toUpperCase() + value.substring(1);
};

exports.uncapitalize = function uncapitalize(value) {
  return value[0].toLowerCase() + value.substring(1);
}

function eachProps(obj, fn) {
  return Object.keys(obj).reduce((result, prop) => {
    result[fn(prop)] = obj[prop];
    return result;
  }, {});
}

exports.capitalizeProps = function (obj) {
  return eachProps(obj, exports.capitalize);
}

exports.uncapitalizeProps = function (obj) {
  return eachProps(obj, exports.uncapitalize);
}
