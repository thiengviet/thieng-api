/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  PORT: 3000,
};

/**
 * Staging configurations
 */
configs.staging = {
  PORT: 80,
};

/**
 * Production configurations
 */
configs.production = {
  PORT: 80,
};

/**
 * Module exports
 */
module.exports = configs;