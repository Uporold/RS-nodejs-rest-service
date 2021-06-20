// import { Board } from './board.model';
// import { Repository } from '../../common/repository';
// import { BoardDto } from './board.dto';
//
// export class BoardRepository extends Repository {
//   async getAll(): Promise<Board[]> {
//     return this.db.getBoards();
//   }
//
//   async create(board: BoardDto): Promise<Board> {
//     const newBoard = new Board(board);
//     return this.db.addBoard(newBoard);
//   }
//
//   async getById(id: string): Promise<Board | undefined> {
//     return this.db.getBoardById(id);
//   }
//
//   async update(board: Board): Promise<void> {
//     return this.db.updateBoard(board);
//   }
//
//   async deleteBoard(id: string): Promise<void> {
//     await this.db.deleteBoard(id);
//   }
// }
import { EntityRepository, Repository } from 'typeorm';
import { BoardEntity } from './board.entity';
// import { BoardDto } from './board.dto';

@EntityRepository(BoardEntity)
export class BoardRepository extends Repository<BoardEntity> {
  // async createBoard(boardDto: BoardDto): Promise<BoardEntity> {
  //   const board = new BoardEntity();
  //   Object.assign(board, boardDto);
  //   await board.save();
  //
  //   return board;
  // }
  // async createBoard(boardDto: BoardDto): Promise<BoardEntity> {
  //   const board = new BoardEntity();
  //   Object.assign(board, boardDto);
  //   await this.save(board);
  //
  //   return board;
  // }
}
