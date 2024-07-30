import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { type IArchivedBaseEntity } from './types';

export class ArchivedBaseEntity extends BaseEntity implements IArchivedBaseEntity {
  @Column({ nullable: true, default: null })
  archivedAt: Date;
}
