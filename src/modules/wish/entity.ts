import { type IWishEntity } from './types';
import { Column, Entity } from 'typeorm';
import { ArchivedBaseEntity } from '../../common/ArchivedBaseEntity';

@Entity('wishes')
export class Wish extends ArchivedBaseEntity implements IWishEntity {
  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ nullable: true, default: null })
  imageSrc: string;
}
