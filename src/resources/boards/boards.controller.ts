import { Response, Request, NextFunction } from 'express';
import { BoardsService } from './boards.service';
import { Message } from '../../common/const';
import { Controller } from '../../common/controller';

export class BoardsController extends Controller {
  private boardsService: BoardsService;

  constructor() {
    super();
    this.boardsService = new BoardsService();
    super.routes();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const boards = await this.boardsService.getAll();
    res.json(boards);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const boardDto = req.body;
    const board = await this.boardsService.create(boardDto);
    res.status(201).json(board);
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const board = await this.boardsService.getById(String(id));
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const boardDto = req.body;
    try {
      const board = await this.boardsService.update(String(id), boardDto);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      await this.boardsService.deleteBoard(String(id));
      res.status(200).json({
        status: 'success',
        statusCode: res.statusCode,
        message: Message.BOARD.DELETED,
      });
    } catch (err) {
      next(err);
    }
  };
}
