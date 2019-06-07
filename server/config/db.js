import mongoose from 'mongoose';

import config from './environment';
console.log('========DBURI=====', config.db.uri);
mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log('Connected with DB');
  })
  .catch((err) => {
    console.error('=====DATABASE CONNECTION ERROR=====', err);
  });
