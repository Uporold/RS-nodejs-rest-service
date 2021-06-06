import { StatusCodes } from 'http-status-codes';
import { BoardRepository } from './board.memory.repository';
import { CustomError } from '../../middlewares/error';
import { TasksService } from '../tasks/tasks.service';
import { Board } from './board.model';
import { BoardDto } from './board.dto';

export class BoardsService {
  private boardRepository: BoardRepository;
  private tasksService: TasksService;

  constructor() {
    this.boardRepository = new BoardRepository();
    this.tasksService = new TasksService();
  }

  async getAll(): Promise<Board[]> {
    return this.boardRepository.getAll();
  }

  async create(board: BoardDto): Promise<Board> {
    return this.boardRepository.create(board);
  }

  async getById(id: string): Promise<Board> {
    const board = await this.boardRepository.getById(id);
    if (!board) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `Board with id ${id} not found`
      );
    }
    return board;
  }

  async update(id: string, board: BoardDto): Promise<Board> {
    const updatedBoard = await this.getById(id);
    Object.assign(updatedBoard, board);
    await this.boardRepository.update(updatedBoard);
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<void> {
    await this.getById(id);
    await this.boardRepository.deleteBoard(id);
    await this.tasksService.removeByBoard(id);
  }
}
