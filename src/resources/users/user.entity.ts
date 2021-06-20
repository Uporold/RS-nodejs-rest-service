import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { classToPlain, Exclude } from 'class-transformer';
import { TaskEntity } from '../tasks/task.entity';

@Entity('user')
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
