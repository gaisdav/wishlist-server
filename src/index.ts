import 'reflect-metadata';
import * as HyperExpress from 'hyper-express';
import { bootstrap } from './bootstrap';

const app = new HyperExpress.Server();

void bootstrap(app).then((server) => {
  server
    .listen(80)
    .then(() => {
      console.log('Webserver started on port 80');
    })
    .catch((error) => {
      console.log('Failed to start server on port 80', error);
    });
});
