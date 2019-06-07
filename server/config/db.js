import mongoose from 'mongoose';

import config from './environment';

mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log('Connected with DB');
  })
  .catch((err) => {
    console.error('=====DATABASE CONNECTION ERROR=====', err);
  });