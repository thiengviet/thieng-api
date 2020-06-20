var { Types } = require('mongoose');

/**
 * Constructor
 */
var utils = {}

utils.parseJSON = function (jsonString) {
  if (!jsonString) return null;
  if (typeof jsonString != 'string') return null;
  try {
    return JSON.parse(jsonString);
  } catch (er) {
    return null;
  }
}

utils.deepParseJSON = function (jsonString) {
  let value = utils.parseJSON(jsonString);
  if (value == null) {
    if (Types.ObjectId.isValid(jsonString)) {
      return Types.ObjectId(jsonString);
    }
    return jsonString;
  }
  if (typeof value == 'array') {
    return value.map(e => utils.deepParseJSON(e));
  }
  else if (typeof value == 'object') {
    let keys = Object.keys(value);
    keys.forEach(key => {
      value[key] = utils.deepParseJSON(value[key]);
    });
    return value;
  }
  else return value;
}

module.exports = utils;