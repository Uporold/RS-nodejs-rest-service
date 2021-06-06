import { TaskRepository } from './task.memory.repository';
import { CustomError } from '../../middlewares/error';
import { Task } from './task.model';
import { TaskDto } from './task.dto';

export class TasksService {
  private taskRepository: TaskRepository;
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAll(boardId: string): Promise<Task[]> {
    return this.taskRepository.getAll(boardId);
  }

  async create(boardId: string, task: TaskDto): Promise<Task> {
    return this.taskRepository.create({ ...task, boardId });
  }

  async getById(id: string, boardId: string): Promise<Task> {
    const task = await this.taskRepository.getById(id, boardId);
    if (!task) {
      throw new CustomError(
        404,
        `Task with id ${id} not found in board with id ${boardId}`
      );
    }
    return task;
  }

  async update(id: string, boardId: string, task: TaskDto): Promise<Task> {
    const updatedTask = await this.getById(id, boardId);
    Object.assign(updatedTask, task);
    await this.taskRepository.update(updatedTask);
    return updatedTask;
  }

  async delete(id: string, boardId: string): Promise<void> {
    await this.getById(id, boardId);
    await this.taskRepository.delete(id);
  }

  async removeByBoard(boardId: string): Promise<void> {
    return this.taskRepository.removeByBoard(boardId);
  }

  async unassignUserTasks(userId: string): Promise<void> {
    await this.taskRepository.unassignUserTasks(userId);
  }
}
