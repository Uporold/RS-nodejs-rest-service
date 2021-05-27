import { Router, Response, Request, NextFunction } from 'express';
import { TasksService } from './tasks.service';
import { Message } from '../../common/const';

export class TasksController {
  private tasksService: TasksService;
  public router: Router;

  constructor() {
    this.tasksService = new TasksService();
    this.router = Router({ mergeParams: true });
    this.routes();
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { boardId } = req.params;
      const tasks = await this.tasksService.getAll(String(boardId));
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { boardId } = req.params;
      const taskDto = req.body;
      const tasks = await this.tasksService.create(String(boardId), taskDto);
      res.status(201).json(tasks);
    } catch (err) {
      next(err);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, boardId } = req.params;
      const task = await this.tasksService.getById(String(id), String(boardId));
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, boardId } = req.params;
      const taskDto = req.body;
      const task = await this.tasksService.update(
        String(id),
        String(boardId),
        taskDto
      );
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id, boardId } = req.params;
      await this.tasksService.delete(String(id), String(boardId));
      res.status(200).json({
        status: 'success',
        statusCode: res.statusCode,
        message: Message.TASK.DELETED,
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
