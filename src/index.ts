import 'reflect-metadata';
import * as HyperExpress from 'hyper-express';
import dotenv from 'dotenv';
import { bootstrap } from './bootstrap';

dotenv.config();

const app = new HyperExpress.Server();

void bootstrap(app).then((server) => {
  server
    .listen(80)
    .then(() => {
      console.log('Webserver started on port 80');
    })
    .catch((error: unknown) => {
      console.log('Failed to start server on port 80', error);
    });
});
