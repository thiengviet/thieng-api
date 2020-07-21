var devS3Auth = require('./keys/s3/dev.thieng-static.json');
var stagingS3Auth = require('./keys/s3/staging.thieng-static.json');
var productionS3Auth = require('./keys/s3/production.thieng-static.json');
var stagingMongoAuth = require('./keys/mongo/staging.thieng-db.json');

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
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
  SAMPLE_DEFAULT: 6,
  // S3
  S3_ACCESS_KEY: devS3Auth.accessKey,
  S3_SECRET_KEY: devS3Auth.secretKey,
  S3_BUCKET_NAME: 'thieng-static',
  LIMIT_FILE_SIZE: {
    image: 10 * 1024 * 1024,
    video: 50 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
}

/**
 * Development configurations
 */
configs.staging = {
  // MongoDB
  MONGO_HOST: `mongodb+srv://${stagingMongoAuth.username}:${stagingMongoAuth.password}@cluster0-rl4kc.mongodb.net/test?retryWrites=true&w=majority`,
  MONGO_CONNECT_OPTION: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  MONGO_DEBUG_MODE: false,
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
  SAMPLE_DEFAULT: 6,
  // S3
  S3_ACCESS_KEY: stagingS3Auth.accessKey,
  S3_SECRET_KEY: stagingS3Auth.secretKey,
  S3_BUCKET_NAME: 'thieng-static',
  LIMIT_FILE_SIZE: {
    image: 10 * 1024 * 1024,
    video: 50 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
}

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
  // Common
  LIMIT_DEFAULT: 5,
  PAGE_DEFAULT: 0,
  SAMPLE_DEFAULT: 6,
  // S3
  S3_ACCESS_KEY: productionS3Auth.accessKey,
  S3_SECRET_KEY: productionS3Auth.secretKey,
  S3_BUCKET_NAME: 'thieng-static',
  LIMIT_FILE_SIZE: {
    image: 10 * 1024 * 1024,
    video: 50 * 1024 * 1024,
  },
  FILE_TYPES: {
    image: ['image/jpg', 'image/jpeg', 'image/png'],
    video: ['video/mp4']
  },
}

/**
 * Module exports
 */
module.exports = configs;
