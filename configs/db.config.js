/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  MONGO_HOST: 'mongodb://localhost/thieng_dev',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Development configurations
 */
configs.staging = {
  MONGO_HOST: 'mongodb://localhost/thieng_stag',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Production configurations
 */
configs.production = {
  MONGO_HOST: 'mongodb://localhost/thieng_prod',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: true,
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Module exports
 */
module.exports = configs;
