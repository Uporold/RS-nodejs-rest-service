import { database, Database } from '../db/database';

export abstract class Repository {
  protected db: Database;

  constructor() {
    this.db = database;
  }
}
