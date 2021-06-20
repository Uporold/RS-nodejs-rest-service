import { createConnection } from 'typeorm';
import options from '../ormconfig';

export const connect = async (): Promise<void> => {
  const connection = await createConnection(options);
  await connection.runMigrations();
};
