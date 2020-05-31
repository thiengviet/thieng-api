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
  if (value == null) return jsonString;
  if (typeof value != 'object') return value;
  let keys = Object.keys(value);
  keys.forEach(key => {
    value[key] = utils.deepParseJSON(value[key]);
  });
  return value;
}

module.exports = utils;