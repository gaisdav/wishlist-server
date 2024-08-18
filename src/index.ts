import 'reflect-metadata';
import * as HyperExpress from 'hyper-express';
import dotenv from 'dotenv';
import { bootstrap } from './bootstrap';

dotenv.config();

export const app = new HyperExpress.Server();

void bootstrap(app).then((server) => {
  server
    .listen(8080)
    .then(() => {
      console.log('Webserver started on port 8080');
    })
    .catch((error: unknown) => {
      console.log('Failed to start server on port 8080', error);
    });
});

export default app;
