import { database } from '../db/database.js';

export class Repository {
  constructor() {
    this.db = database;
  }
}
