import { Router } from 'express';
import { BoardsService } from './boards.service.js';
import { Message } from '../../common/const.js';

export class BoardsController {
  constructor() {
    this.boardsService = new BoardsService();
    this.router = Router();
    this.routes();
  }

  getAll = async (req, res) => {
    const boards = await this.boardsService.getAll();
    res.json(boards);
  };

  create = async (req, res) => {
    const boardDto = req.body;
    const board = await this.boardsService.create(boardDto);
    res.status(201).json(board);
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const board = await this.boardsService.getById(id);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const boardDto = req.body;
    try {
      const board = await this.boardsService.update(id, boardDto);
      res.status(200).json(board);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.boardsService.deleteBoard(id);
      res.status(200).json({
        status: 'success',
        statusCode: res.statusCode,
        message: Message.BOARD.DELETED,
      });
    } catch (err) {
      next(err);
    }
  };

  routes() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
