'use strict';

const dotenv = require('dotenv');


// Load environment variables from .env file
const result = dotenv.config();

if (result.error) {
  throw result.error
}

const env = process.env.NODE_ENV || 'development';

const configs = {
  production: {
    port: process.env.API_PORT_PRODUCTION || 7071,
    origin: process.env.ORIGIN || 'http://localhost:3001',
  },
  development: {
    env,
    name: process.env.APP_NAME || 'task-app-api',
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.API_PORT_DEVELOPMENT || 7070,
    origin: process.env.ORIGIN || 'http://localhost:3001',
    db: {
      uri: process.env.DB_URI,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    }
  },
  test: {
    port: 7072,
  }
};

const config = Object.assign(configs.development, configs[env]);

module.exports = config;
