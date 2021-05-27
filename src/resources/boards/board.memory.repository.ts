import { Board } from './board.model';
import { Repository } from '../../common/repository';
import { BoardDto } from './board.dto';

export class BoardRepository extends Repository {
  async getAll(): Promise<Board[]> {
    return this.db.getBoards();
  }

  async create(board: BoardDto): Promise<Board> {
    const newBoard = new Board(board);
    return this.db.addBoard(newBoard);
  }

  async getById(id: string): Promise<Board | undefined> {
    return this.db.getBoardById(id);
  }

  async update(board: Board): Promise<void> {
    return this.db.updateBoard(board);
  }

  async deleteBoard(id: string): Promise<void> {
    await this.db.deleteBoard(id);
  }
}
