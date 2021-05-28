import { Router, Response, Request, NextFunction } from 'express';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Message } from '../../common/const';
import { UserDto } from './user.dto';

export class UsersController {
  private userService: UsersService;
  public router: Router;

  constructor() {
    this.userService = new UsersService();
    this.router = Router();
    this.routes();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAll();
    res.json(users.map(User.toResponse));
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const userDto: UserDto = req.body;
    const user = await this.userService.create(userDto);
    res.status(201).json(User.toResponse(user));
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const user = await this.userService.getById(String(id));
      res.status(200).json(User.toResponse(user));
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
    const userDto: UserDto = req.body;
    try {
      const user = await this.userService.update(String(id), userDto);
      res.status(200).json(User.toResponse(user));
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
      await this.userService.deleteUser(String(id));
      res.status(200).json({
        status: 'success',
        statusCode: res.statusCode,
        message: Message.USER.DELETED,
      });
    } catch (err) {
      next(err);
    }
  };

  routes(): void {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}
