import { Board } from './board.model.js';
import { Repository } from '../../common/repository.js';

/**
 * Class representing Board Repository
 * @extends Repository
 */
export class BoardRepository extends Repository {
  /**
   * Get all boards from db
   * @returns {Promise<Board[]>} - boards array
   */
  async getAll() {
    return this.db.getBoards();
  }

  /**
   * Create new board
   * @param {BoardDto} board - board data transfer object
   * @returns {Promise<Board>} - created board
   */
  async create(board) {
    const newBoard = new Board(board);
    return this.db.addBoard(newBoard);
  }

  /**
   * Get board by id
   * @param {string} id - board id
   * @returns {Promise<Board|undefined>} - if success returns found board, else - undefined
   */
  async getById(id) {
    return this.db.getBoardById(id);
  }

  /**
   * Update board
   * @param {Board} board - updated board
   * @returns {Promise<void>}
   */
  async update(board) {
    return this.db.updateBoard(board);
  }

  /**
   * Delete board by id
   * @param {string} id - board id
   * @returns {Promise<void>}
   */
  async deleteBoard(id) {
    await this.db.deleteBoard(id);
  }
}
