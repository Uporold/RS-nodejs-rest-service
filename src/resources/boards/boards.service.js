import { BoardRepository } from './board.memory.repository.js';
import { CustomError } from '../../middlewares/error.js';
import { TasksService } from '../tasks/tasks.service.js';

export class BoardsService {
  constructor() {
    this.boardRepository = new BoardRepository();
    this.tasksService = new TasksService();
  }

  async getAll() {
    return this.boardRepository.getAll();
  }

  async create(board) {
    return this.boardRepository.create(board);
  }

  async getById(id) {
    const board = await this.boardRepository.getById(id);
    if (!board) {
      throw new CustomError(404, `Board with id ${id} not found`);
    }
    return board;
  }

  async update(id, board) {
    const updatedBoard = await this.getById(id);
    updatedBoard.title = board.title;
    updatedBoard.columns = board.columns;
    await this.boardRepository.update(updatedBoard);
    return updatedBoard;
  }

  async deleteBoard(id) {
    await this.getById(id);
    await this.boardRepository.deleteBoard(id);
    await this.tasksService.removeByBoard(id);
  }
}
