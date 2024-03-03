import { type IWishEntity } from './types';
import { BaseEntity } from '../../common/Entity';
import { Column, Entity } from 'typeorm';

@Entity('wishes')
export class Wish extends BaseEntity implements IWishEntity {
  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ nullable: true, default: null })
  imageSrc: string;
}
