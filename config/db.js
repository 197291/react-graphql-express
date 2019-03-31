import mongoose from 'mongoose';

import config from './environment';

import User from '../models/User';
import Recipe from '../models/Recipe';

mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log('Connected with DB');
  })
  .catch((err) => {
    console.error('=====DATABASE CONNECTION ERROR=====', err);
  })
