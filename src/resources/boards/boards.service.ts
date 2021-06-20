import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import { BoardRepository } from './board.repository';
import { CustomError } from '../../middlewares/error';
// import { TasksService } from '../tasks/tasks.service';
import { BoardDto } from './board.dto';
import { BoardEntity } from './board.entity';

export class BoardsService {
  private boardRepository: BoardRepository;
  // private tasksService: TasksService;

  constructor() {
    this.boardRepository = getConnection().getCustomRepository(BoardRepository);
    // this.tasksService = new TasksService();
  }

  async getAll(): Promise<BoardEntity[]> {
    return this.boardRepository.find();
  }

  async create(boardDto: BoardDto): Promise<BoardEntity> {
    const board = this.boardRepository.create(boardDto);
    await this.boardRepository.save(board);
    return board;
  }

  async getById(id: string): Promise<BoardEntity> {
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `Board with id ${id} not found`
      );
    }
    return board;
  }

  async update(id: string, board: BoardDto): Promise<BoardEntity> {
    const updatedBoard = await this.getById(id);
    Object.assign(updatedBoard, board);
    await this.boardRepository.save(updatedBoard);
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<void> {
    // await this.getById(id);
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `Board with id ${id} not found`
      );
    }
    // await this.tasksService.removeByBoard(id);
  }
}
