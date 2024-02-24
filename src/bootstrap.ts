import { type Server } from 'hyper-express';
import { AuthController } from './auth/controller';

export const bootstrap = (server: Server): void => {
  const controllers = [new AuthController()];

  for (const controller of controllers) {
    controller.init(server);
  }
};
