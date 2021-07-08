import { Module } from '@nestjs/common';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './typeorm.config';
import { AuthModule } from './resources/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(options),
    TasksModule,
    UsersModule,
    BoardsModule,
    AuthModule,
  ],
})
export class AppModule {}
