import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { type IUserEntity } from './types';

@Entity('users')
export class User extends BaseEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatarSrc: string;

  @Column()
  bio: string;

  @Column()
  birthdate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  email: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  username: string;
}
