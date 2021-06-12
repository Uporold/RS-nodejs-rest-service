import { User } from '../resources/users/user.model';
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';

export class Database {
  private _users: User[];
  private _boards: Board[];
  private _tasks: Task[];

  constructor() {
    this._users = [];
    this._boards = [];
    this._tasks = [];
  }

  // User
  async getUsers(): Promise<User[]> {
    return this._users;
  }

  async addUser(user: User): Promise<User> {
    await this._users.push(user);
    return user;
  }

  async getUserById(id: string): Promise<User | undefined> {
    return this._users.find((user) => user.id === id);
  }

  async updateUser(user: User): Promise<void> {
    this._users = this._users.map((elem) =>
      elem.id === user.id ? user : elem
    );
  }

  async deleteUser(id: string): Promise<void> {
    this._users = this._users.filter((elem) => elem.id !== id);
  }

  // Board

  async getBoards(): Promise<Board[]> {
    return this._boards;
  }

  async addBoard(board: Board): Promise<Board> {
    await this._boards.push(board);
    return board;
  }

  async getBoardById(id: string): Promise<Board | undefined> {
    return this._boards.find((board) => board.id === id);
  }

  async updateBoard(board: Board): Promise<void> {
    this._boards = this._boards.map((elem) =>
      elem.id === board.id ? board : elem
    );
  }

  async deleteBoard(id: string): Promise<void> {
    this._boards = this._boards.filter((elem) => elem.id !== id);
  }

  // Task

  async removeByBoard(boardId: string): Promise<void> {
    this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
  }

  async unassignUserTasks(userId: string): Promise<void> {
    this._tasks = this._tasks.map((task) =>
      task.userId === userId ? { ...task, userId: null } : task
    );
  }

  async getTasks(boardId: string): Promise<Task[]> {
    return this._tasks.filter((task) => task.boardId === boardId);
  }

  async addTask(task: Task): Promise<Task> {
    await this._tasks.push(task);
    return task;
  }

  async getTaskById(id: string, boardId: string): Promise<Task | undefined> {
    return this._tasks.find(
      (task) => task.id === id && task.boardId === boardId
    );
  }

  async updateTask(task: Task): Promise<void> {
    this._tasks = this._tasks.map((elem) =>
      task.id === elem.id ? task : elem
    );
  }

  async deleteTask(id: string): Promise<void> {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }
}

export const database = new Database();
