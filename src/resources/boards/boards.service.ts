import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardEntity } from './board.entity';
import { BoardDto } from './board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository
  ) {}

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
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  async update(id: string, board: BoardDto): Promise<BoardEntity> {
    const updatedBoard = await this.getById(id);
    Object.assign(updatedBoard, board);
    await this.boardRepository.save(updatedBoard);
    return updatedBoard;
  }

  async delete(id: string): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
  }
}
