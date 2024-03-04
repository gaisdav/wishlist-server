import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { type IArchivedBaseEntity } from './types';

export class ArchivedBaseEntity extends BaseEntity implements IArchivedBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ nullable: true, default: null })
  archivedAt: Date;
}
