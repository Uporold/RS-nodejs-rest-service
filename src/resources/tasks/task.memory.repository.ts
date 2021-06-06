import { Repository } from '../../common/repository';
import { Task } from './task.model';
import { TaskWithBoardDto } from './task.dto';

export class TaskRepository extends Repository {
  async getAll(boardId: string): Promise<Task[]> {
    return this.db.getTasks(boardId);
  }

  async create(task: TaskWithBoardDto): Promise<Task> {
    const newTask = new Task(task);
    return this.db.addTask(newTask);
  }

  async getById(id: string, boardId: string): Promise<Task | undefined> {
    return this.db.getTaskById(id, boardId);
  }

  async update(task: Task): Promise<void> {
    return this.db.updateTask(task);
  }

  async delete(id: string): Promise<void> {
    return this.db.deleteTask(id);
  }

  async removeByBoard(boardId: string): Promise<void> {
    return this.db.removeByBoard(boardId);
  }

  async unassignUserTasks(userId: string): Promise<void> {
    return this.db.unassignUserTasks(userId);
  }
}
