import { database, Database } from '../db/database';

export class Repository {
  protected db: Database;

  constructor() {
    this.db = database;
  }
}
