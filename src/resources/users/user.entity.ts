import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { TaskEntity } from '../tasks/task.entity';

@Entity('users')
@Unique(['login'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password!: string;

  @OneToMany((_type) => TaskEntity, (task) => task.user, {
    eager: false,
  })
  tasks!: TaskEntity[];

  toJSON() {
    return classToPlain(this);
  }
}
