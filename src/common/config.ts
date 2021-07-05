import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const config = {
  PORT: process.env['PORT'],
  NODE_ENV: process.env['NODE_ENV'],
  MONGO_CONNECTION_STRING: process.env['MONGO_CONNECTION_STRING'],
  JWT_SECRET_KEY: String(process.env['JWT_SECRET_KEY']),
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_PORT: Number(process.env['POSTGRES_PORT']),
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
};
