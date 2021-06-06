import { Response, Request } from 'express';
import { TasksService } from './tasks.service';
import { Message } from '../../common/const';
import { Controller } from '../../common/controller';

export class TasksController extends Controller {
  private tasksService: TasksService;

  constructor() {
    super({ mergeParams: true });
    this.tasksService = new TasksService();
    super.routes();
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const { boardId } = req.params;
    const tasks = await this.tasksService.getAll(String(boardId));
    res.json(tasks);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const { boardId } = req.params;
    const taskDto = req.body;
    const tasks = await this.tasksService.create(String(boardId), taskDto);
    res.status(201).json(tasks);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const { id, boardId } = req.params;
    const task = await this.tasksService.getById(String(id), String(boardId));
    res.status(200).json(task);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id, boardId } = req.params;
    const taskDto = req.body;
    const task = await this.tasksService.update(
      String(id),
      String(boardId),
      taskDto
    );
    res.status(200).json(task);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const { id, boardId } = req.params;
    await this.tasksService.delete(String(id), String(boardId));
    res.status(200).json({
      status: 'success',
      statusCode: res.statusCode,
      message: Message.TASK.DELETED,
    });
  };
}
