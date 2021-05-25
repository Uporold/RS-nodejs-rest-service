import { Repository } from '../../common/repository.js';
import { Task } from './task.model.js';

/**
 * Class representing Task Repository
 * @extends Repository
 */
export class TaskRepository extends Repository {
  /**
   * Get all tasks on board by board id
   * @param {string} boardId - board id
   * @returns {Promise<Task[]>} - tasks array
   */
  async getAll(boardId) {
    return this.db.getTasks(boardId);
  }

  /**
   * Create new task
   * @param task - task data transfer object
   * @returns {Promise<Task>} - added task
   */
  async create(task) {
    return this.db.addTask(new Task(task));
  }

  /**
   * Get task in board by task id and board id
   * @param {string} id - task id
   * @param {string} boardId - board id
   * @returns {Promise<Task|undefined>} - if success returns found task, else - undefined
   */
  async getById(id, boardId) {
    return this.db.getTaskById(id, boardId);
  }

  /**
   * Update task
   * @param {Task} task - task data transfer object
   * @returns {Promise<void>}
   */
  async update(task) {
    return this.db.updateTask(task);
  }

  /**
   * Delete task by id
   * @param {string} id - task id
   * @returns {Promise<void>}
   */
  async delete(id) {
    return this.db.deleteTask(id);
  }

  /**
   * Remove all tasks with transferred board id which is deleted
   * @param boardId - deleted board id
   * @returns {Promise<void>}
   */
  async removeByBoard(boardId) {
    return this.db.removeByBoard(boardId);
  }

  /**
   * Set all tasks userId to null by transferred userId which is deleted
   * @param userId - deleted user id
   * @returns {Promise<void>}
   */
  async unassignUserTasks(userId) {
    return this.db.unassignUserTasks(userId);
  }
}
