/**
 * Contructor
 */
var configs = {};

/**
 * Development configurations
 */
configs.development = {
  // MongoDB
  MONGO_HOST: 'mongodb://localhost/thieng_dev',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  // GraphQL
  GRAPHIQL: true,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Development configurations
 */
configs.staging = {
  // MongoDB
  MONGO_HOST: 'mongodb://localhost/thieng_stag',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  // GraphQL
  GRAPHIQL: true,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Production configurations
 */
configs.production = {
  // MongoDB
  MONGO_HOST: 'mongodb://localhost/thieng_prod',
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: true,
  // GraphQL
  GRAPHIQL: true,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 1
};

/**
 * Module exports
 */
module.exports = configs;
