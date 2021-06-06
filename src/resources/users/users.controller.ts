import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Message } from '../../common/const';
import { UserDto } from './user.dto';
import { Controller } from '../../common/controller';

export class UsersController extends Controller {
  private userService: UsersService;

  constructor() {
    super();
    this.userService = new UsersService();
    super.routes();
  }

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAll();
    res.status(StatusCodes.OK).json(users.map(User.toResponse));
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const userDto: UserDto = req.body;
    const user = await this.userService.create(userDto);
    res.status(StatusCodes.CREATED).json(User.toResponse(user));
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await this.userService.getById(String(id));
    res.status(StatusCodes.OK).json(User.toResponse(user));
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userDto = req.body;

    const user = await this.userService.update(String(id), userDto);
    res.status(StatusCodes.OK).json(User.toResponse(user));
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.userService.deleteUser(String(id));
    res.status(StatusCodes.OK).json({
      status: 'success',
      statusCode: res.statusCode,
      message: Message.USER.DELETED,
    });
  };
}
