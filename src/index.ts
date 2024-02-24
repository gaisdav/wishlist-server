import * as HyperExpress from 'hyper-express';
import { bootstrap } from './bootstrap';

const server = new HyperExpress.Server();
bootstrap(server);

server
  .listen(80)
  .then(() => {
    console.log('Webserver started on port 80');
  })
  .catch((error) => {
    console.log('Failed to start server on port 80', error);
  });
