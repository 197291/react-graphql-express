import express from 'express';
import path from 'path';

import './config/db';
import config from './config/environment';
import app from './config/app';

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(config.port, () => {
  console.log(`Server listen port ${config.port}`);
});
