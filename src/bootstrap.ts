import { type Server } from 'hyper-express';
import { AuthController } from './auth/controller';
import { UserController } from './user/controller';
import { User } from './user/entity';
import { DataSource } from 'typeorm';
import { UserService } from './user/service';

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

  const userRepository = dataSource.getRepository(User);

  const controllers = [new AuthController(), new UserController(new UserService(userRepository))];

  for (const controller of controllers) {
    controller.init(server);
  }

  return server;
};
