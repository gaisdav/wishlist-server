import { type Server } from 'hyper-express';
import { AuthController } from './modules/auth/controller';
import { UserController } from './modules/user/controller';
import { User } from './modules/user/entity';
import { UserService } from './modules/user/service';
import { UserRepository } from './modules/user/repository';
import { Wish } from './modules/wish/entity';
import { WishRepository } from './modules/wish/repository';
import { WishService } from './modules/wish/service';
import { WishController } from './modules/wish/controller';
import process from 'process';
import { AuthService } from './modules/auth/service';
import { AuthRepository } from './modules/auth/repository';
import { errorHandler, notFoundHandler, deserializeUser } from './middleware';
import { dataSource } from './dataSource';
import { ProfileController } from './modules/profile/controller';
import { ProfileService } from './modules/profile/service';
import { ProfileRepository } from './modules/profile/repository';

export const bootstrap = async (server: Server): Promise<Server> => {
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? '';
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI ?? '';

  /**
   * Middlewares
   */
  server.use(deserializeUser);
  server.set_error_handler(errorHandler);
  server.set_not_found_handler(notFoundHandler);

  /**
   * Initialize database connection
   */
  await dataSource.initialize();

  /**
   * Repositories
   */
  const authRepository = new AuthRepository(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);
  const userRepository = new UserRepository(dataSource.getRepository(User));
  const wishRepository = new WishRepository(dataSource.getRepository(Wish));
  const profileRepository = new ProfileRepository(dataSource.getRepository(User));

  /**
   * Services
   */
  const userService = new UserService(userRepository);
  const authService = new AuthService(userService, authRepository);
  const wishService = new WishService(wishRepository);
  const profileService = new ProfileService(profileRepository);

  /**
   * Controllers
   */
  void new AuthController(server, authService);
  void new UserController(server, userService);
  void new WishController(server, wishService);
  void new ProfileController(server, profileService);

  return server;
};
