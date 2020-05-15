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
  PAGE_DEFAULT: 0,
  // Uploader path
  UPLOADER_PATH: {
    image: 'public/images',
    video: 'public/videos',
  },
  LIMIT_FILE_SIZE: {
    image: 10 * 1024 * 1024,
    video: 100 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
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
  PAGE_DEFAULT: 0,
  // Uploader path
  UPLOADER_PATH: {
    image: 'public/images',
    video: 'public/videos',
  },
  LIMIT_FILE_SIZE: {
    image: 5 * 1024 * 1024,
    video: 50 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
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
  PAGE_DEFAULT: 0,
  // Uploader path
  UPLOADER_PATH: {
    image: 'public/images',
    video: 'public/videos',
  },
  LIMIT_FILE_SIZE: {
    image: 10 * 1024 * 1024,
    video: 100 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
};

/**
 * Module exports
 */
module.exports = configs;
