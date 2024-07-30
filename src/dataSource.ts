import { User } from './modules/user/entity';
import { Wish } from './modules/wish/entity';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Wish],
  logging: true,
  synchronize: true,
  ssl: true,
  subscribers: [],
  migrations: [],
});
