import { TaskRepository } from './task.memory.repository.js';
import { ErrorHandler } from '../../middlewares/error.js';

export class TasksService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async getAll(boardId) {
    return this.taskRepository.getAll(boardId);
  }

  async create(boardId, task) {
    return this.taskRepository.create({ ...task, boardId });
  }

  async getById(id, boardId) {
    const task = await this.taskRepository.getById(id, boardId);
    if (!task) {
      throw new ErrorHandler(
        404,
        `Task with id ${id} not found in board with id ${boardId}`
      );
    }
    return task;
  }

  async update(id, boardId, task) {
    const updatedTask = await this.taskRepository.getById(id, boardId);
    updatedTask.title = task.title;
    updatedTask.order = task.order;
    updatedTask.description = task.description;
    updatedTask.userId = task.userId;
    updatedTask.boardId = boardId;
    updatedTask.columnId = task.columnId;
    await this.taskRepository.update(updatedTask);
    return updatedTask;
  }

  async delete(id, boardId) {
    await this.getById(id, boardId);
    await this.taskRepository.delete(id);
  }

  async removeByBoard(boardId) {
    return this.taskRepository.removeByBoard(boardId);
  }

  async unassignUserTasks(userId) {
    await this.taskRepository.unassignUserTasks(userId);
  }
}
