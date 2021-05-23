import { Router } from 'express';
import { UsersService } from './users.service.js';
import { User } from './user.model.js';
import { Message } from '../../common/const.js';

export class UsersController {
  constructor() {
    this.userService = new UsersService();
    this.router = Router();
    this.routes();
  }

  getAll = async (req, res) => {
    const users = await this.userService.getAll();
    res.json(users.map(User.toResponse));
  };

  create = async (req, res) => {
    const userDto = req.body;
    const user = await this.userService.create(userDto);
    res.status(201).json(User.toResponse(user));
  };

  getById = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await this.userService.getById(id);
      res.status(200).json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    const { id } = req.params;
    const userDto = req.body;
    try {
      const user = await this.userService.update(id, userDto);
      res.status(200).json(User.toResponse(user));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    const { id } = req.params;
    try {
      await this.userService.deleteUser(id);
      res.status(200).json({
        status: 'success',
        statusCode: res.statusCode,
        message: Message.USER.DELETED,
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
