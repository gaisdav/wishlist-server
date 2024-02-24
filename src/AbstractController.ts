import { type Server } from 'hyper-express';

export abstract class AbstractController {
  abstract init(server: Server): void;
}
