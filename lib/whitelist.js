function whitelist(source, allowedKeys) {
  if (isArray(source)) return filterArray(source, allowedKeys);

  if (isObject(source)) return filterObject(source, allowedKeys);
}

const isArray = value =>
  Object.prototype.toString.call(value) === "[object Array]";

const isObject = value =>
  Object.prototype.toString.call(value) === "[object Object]";

const isString = value =>
  Object.prototype.toString.call(value) === "[object String]";

function filterObject(source, allowedKeys) {
  const sourceKeys = Object.keys(source);
  let fn;

  if (isArray(allowedKeys)) {
    fn = Object.values;
  }

  if (isObject(allowedKeys)) {
    fn = Object.keys;
  }

  const keys = fn(allowedKeys);

  const objs = keys.reduce((obj, key) => {
    if (sourceKeys.includes(key)) {
      if (isObject(allowedKeys[key])) {
        obj[key] = filterObject(source[key], allowedKeys[key]);
      } else if (isArray(allowedKeys[key])) {
        obj[key] = filterObjectArray(source[key], allowedKeys[key]);
      } else {
        obj[key] = source[key];
      }
    }

    return obj;
  }, {});

  return objs;
}

function filterObjectArray(source, allowedKeys) {
  const sourceKeys = Object.keys(source);

  return Object.values(allowedKeys).reduce((obj, key) => {
    if (sourceKeys.includes(key)) {
      obj[key] = source[key];
    }

    return obj;
  }, {});
}

function filterArray(source, allowedKeys) {
  const sourceKeys = Object.values(source);

  return Object.values(allowedKeys).reduce((ary, key) => {
    if (sourceKeys.includes(key)) {
      ary.push(key);
    }

    return ary;
  }, []);
}

function filterKey(source, keyIndex) {
  if (source !== null && source !== undefined) {
    if (isString(keyIndex)) {
      return source;
    }

    if (isArray(keyIndex)) {
      return filterArray(source, keyIndex);
    }

    if (isObject(keyIndex)) {
      return filterObject(source, keyIndex);
    }
  }

  return undefined;
}

module.exports = { whitelist };
