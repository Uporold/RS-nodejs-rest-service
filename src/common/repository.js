import { database } from '../db/database.js';

/**
 * Class representing Repository
 */
export class Repository {
  constructor() {
    this.db = database;
  }
}
