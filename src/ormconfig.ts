import { ConnectionOptions } from 'typeorm';
import { config } from './common/config';

const options: ConnectionOptions = {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  database: config.POSTGRES_DB,
  entities: [`${__dirname}/resources/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = options;
