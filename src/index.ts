import 'reflect-metadata';
import { bootstrap } from './bootstrap';

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
