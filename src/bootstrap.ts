import { type Server } from 'hyper-express';
import { AuthController } from './modules/auth/controller';
import { UserController } from './modules/user/controller';
import { User } from './modules/user/entity';
import { DataSource } from 'typeorm';
import { UserService } from './modules/user/service';
import { UserRepository } from './modules/user/repository';

export const bootstrap = async (server: Server): Promise<Server> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 3306,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [User],
    logging: true,
    synchronize: true,
    subscribers: [],
    migrations: [],
  });

  await dataSource.initialize();

  const userRepository = new UserRepository(dataSource.getRepository(User));
  const userService = new UserService(userRepository);

  const controllers = [new AuthController(), new UserController(userService)];

  for (const controller of controllers) {
    controller.init(server);
  }

  return server;
};
