import { Board } from './board.model.js';
import { Repository } from '../../common/repository.js';

export class BoardRepository extends Repository {
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
