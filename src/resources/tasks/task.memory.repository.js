import { Repository } from '../../common/repository.js';
import { Task } from './task.model.js';

export class TaskRepository extends Repository {
  async getAll(boardId) {
    return this.db.getTasks(boardId);
  }

  async create(task) {
    return this.db.addTask(new Task(task));
  }

  async getById(id, boardId) {
    return this.db.getTaskById(id, boardId);
  }

  async update(task) {
    return this.db.updateTask(task);
  }

  async delete(id) {
    return this.db.deleteTask(id);
  }

  async removeByBoard(boardId) {
    return this.db.removeByBoard(boardId);
  }

  async unassignUserTasks(userId) {
    return this.db.unassignUserTasks(userId);
  }
}
