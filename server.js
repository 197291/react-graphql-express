import './config/db';
import config from './config/environment';
import app from './config/app';

app.listen(config.port, () => {
  console.log(`Server listen port ${config.port}`);
});
