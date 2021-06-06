import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
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
    res.status(StatusCodes.OK).json(boards);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const boardDto = req.body;
    const board = await this.boardsService.create(boardDto);
    res.status(StatusCodes.CREATED).json(board);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const board = await this.boardsService.getById(String(id));
    res.status(StatusCodes.OK).json(board);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const boardDto = req.body;
    const board = await this.boardsService.update(String(id), boardDto);
    res.status(StatusCodes.OK).json(board);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.boardsService.deleteBoard(String(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      statusCode: res.statusCode,
      message: Message.BOARD.DELETED,
    });
  };
}
