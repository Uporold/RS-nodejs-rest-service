import { Database } from '../db/database.js';
import { Board } from './board.model.js';

export class BoardRepository {
  constructor() {
    this.db = new Database();
  }

  async getAll() {
    return this.db.getBoards();
  }

  async create(board) {
    return this.db.addBoard(new Board(board));
  }

  async getById(id) {
    return this.db.getBoardById(id);
  }

  async update(board) {
    return this.db.updateBoard(board);
  }

  async deleteBoard(id) {
    await this.db.deleteBoard(id);
  }
}