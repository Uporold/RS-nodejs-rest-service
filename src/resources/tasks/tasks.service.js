import { TaskRepository } from './task.memory.repository.js';
import { CustomError } from '../../middlewares/error.js';

/**
 * Class representing Tasks Service
 */
export class TasksService {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  /**
   * Get all tasks on board by board id
   * @param {string} boardId - board id
   * @returns {Promise<Task[]>} - tasks array
   */
  async getAll(boardId) {
    return this.taskRepository.getAll(boardId);
  }

  /**
   * Create new task on board
   * @param {TaskDto} task - task data transfer object
   * @returns {Promise<Task>} - created task
   */
  async create(task) {
    return this.taskRepository.create(task);
  }

  /**
   * Get task in board by task id and board id
   * @param {string} id - task id
   * @param {string} boardId - board id
   * @throws will throw an error if not found task with given id
   * @returns {Promise<Task>} - found task
   */
  async getById(id, boardId) {
    const task = await this.taskRepository.getById(id, boardId);
    if (!task) {
      throw new CustomError(
        404,
        `Task with id ${id} not found in board with id ${boardId}`
      );
    }
    return task;
  }

  /**
   * Update task
   * @param {string} id - task id
   * @param {TaskDto} task - task data transfer object
   * @throws will throw an error if not found task with given id
   * @returns {Promise<Task>}
   */
  async update(id, task) {
    const updatedTask = await this.getById(id, task.boardId);
    updatedTask.title = task.title;
    updatedTask.order = task.order;
    updatedTask.description = task.description;
    updatedTask.userId = task.userId;
    updatedTask.columnId = task.columnId;
    await this.taskRepository.update(updatedTask);
    return updatedTask;
  }

  /**
   * Delete task
   * @param id - task id
   * @param boardId - board id
   * @throws will throw an error if not found task with given id
   * @returns {Promise<void>}
   */
  async delete(id, boardId) {
    await this.getById(id, boardId);
    await this.taskRepository.delete(id);
  }

  /**
   * Remove all tasks with transferred board id which is deleted
   * @param boardId - board id
   * @returns {Promise<void>}
   */
  async removeByBoard(boardId) {
    return this.taskRepository.removeByBoard(boardId);
  }

  /**
   * Set all tasks userId to null by transferred userId which is deleted
   * @param userId - user id
   * @returns {Promise<void>}
   */
  async unassignUserTasks(userId) {
    await this.taskRepository.unassignUserTasks(userId);
  }
}
