import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from './common/config';

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
