'use strict';

const dotenv = require('dotenv');

// Load environment variables from .env file
const result = dotenv.config({ silent: true });

if (result.error) {
  throw result.error;
}
console.log('====process.env.PORT=====', process.env.PORT);
console.log('====process.env.DB_URI=====', process.env.DB_URI);
const env = process.env.NODE_ENV || 'development';

const configs = {
  production: {
    port: process.env.PORT || 7071,
    origin: process.env.ORIGIN || 'http://localhost:3001',
    db: {
      uri: process.env.DB_URI
    },
    jwtOptions: {
      secret: process.env.SECRET || 'jdhfj4hr734wefhdcui49fwehc93824yhc9euic',
      exp: process.env.EXP || 36000
    }
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
      pass: process.env.DB_PASS
    },
    jwtOptions: {
      secret: process.env.SECRET || 'jdhfj4hr734wefhdcui49fwehc93824yhc9euic',
      exp: process.env.EXP || 36000
    }
  },
  test: {
    port: 7072
  }
};

const config = Object.assign(configs.development, configs[env]);

module.exports = config;
