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

module.exports = utils;