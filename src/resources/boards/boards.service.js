import { BoardRepository } from './board.memory.repository.js';
import { CustomError } from '../../middlewares/error.js';
import { TasksService } from '../tasks/tasks.service.js';

/**
 * Class representing Boards Service
 */
export class BoardsService {
  constructor() {
    this.boardRepository = new BoardRepository();
    this.tasksService = new TasksService();
  }

  /**
   * Get all boards
   * @returns {Promise<Board[]>} - boards array
   */
  async getAll() {
    return this.boardRepository.getAll();
  }

  /**
   * Create new board
   * @param {BoardDto} board - board data transfer object
   * @returns {Promise<Board>} - created board
   */
  async create(board) {
    return this.boardRepository.create(board);
  }

  /**
   * Get board by id
   * @param {string} id - board id
   * @throws will throw an error if board is undefined
   * @returns {Promise<Board>} - found board
   */
  async getById(id) {
    const board = await this.boardRepository.getById(id);
    if (!board) {
      throw new CustomError(404, `Board with id ${id} not found`);
    }
    return board;
  }

  /**
   * Update board
   * @param {string} id - board id
   * @param {BoardDto} board - board data transfer object
   * @throws will throw an error if not found board with given id
   * @returns {Promise<Board>} - updated board
   */
  async update(id, board) {
    const updatedBoard = await this.getById(id);
    updatedBoard.title = board.title;
    updatedBoard.columns = board.columns;
    await this.boardRepository.update(updatedBoard);
    return updatedBoard;
  }

  /**
   *
   * @param {string} id - board id
   * @throws will throw an error if not found board with given id
   * @returns {Promise<void>}
   */
  async deleteBoard(id) {
    await this.getById(id);
    await this.boardRepository.deleteBoard(id);
    await this.tasksService.removeByBoard(id);
  }
}
