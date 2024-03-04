import { type Server } from 'hyper-express';
import { DataSource } from 'typeorm';
import { AuthController } from './modules/auth/controller';
import { UserController } from './modules/user/controller';
import { User } from './modules/user/entity';
import { UserService } from './modules/user/service';
import { UserRepository } from './modules/user/repository';
import { NotFoundException } from './exceptions/NotFoundException';
import { Wish } from './modules/wish/entity';
import { WishRepository } from './modules/wish/repository';
import { WishService } from './modules/wish/service';
import { WishController } from './modules/wish/controller';

export const bootstrap = async (server: Server): Promise<Server> => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 3306,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    entities: [User, Wish],
    logging: true,
    synchronize: true,
    subscribers: [],
    migrations: [],
  });

  /**
   * Initialize database connection
   */
  await dataSource.initialize();

  /**
   * Repositories
   */
  const userRepository = new UserRepository(dataSource.getRepository(User));
  const wishRepository = new WishRepository(dataSource.getRepository(Wish));

  /**
   * Services
   */
  const userService = new UserService(userRepository);
  const wishService = new WishService(wishRepository);

  /**
   * Controllers
   */
  const controllers = [new AuthController(), new UserController(userService), new WishController(wishService)];

  /**
   * Init server in controllers
   */
  for (const controller of controllers) {
    controller.init(server);
  }

  /**
   * 404 handler
   */
  server.all('*', function (req, res) {
    res.status(404).json(new NotFoundException('Route not found'));
  });

  return server;
};
