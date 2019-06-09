import mongoose from 'mongoose';

import config from './environment';

mongoose.set('useCreateIndex', true);

mongoose
  .connect(config.db.uri, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected with DB');
  })
  .catch((err) => {
    console.error('=====DATABASE CONNECTION ERROR=====', err);
  });
