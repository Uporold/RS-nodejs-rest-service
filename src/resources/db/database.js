export class Database {
  constructor() {
    this._users = [];
    this._boards = [];
    this._tasks = [];
  }

  // User

  async getUsers() {
    return this._users;
  }

  async addUser(user) {
    await this._users.push(user);
    return user;
  }

  async getUserById(id) {
    return this._users.find((user) => user.id === id);
  }

  async updateUser(user) {
    this._users = this._users.map((elem) =>
      elem.id === user.id ? user : elem
    );
  }

  async deleteUser(id) {
    this._users = this._users.filter((elem) => elem.id !== id);
  }

  // Board

  async getBoards() {
    return this._boards;
  }

  async addBoard(board) {
    await this._boards.push(board);
    return board;
  }

  async getBoardById(id) {
    return this._boards.find((board) => board.id === id);
  }

  async updateBoard(board) {
    this._boards = this._boards.map((elem) =>
      elem.id === board.id ? board : elem
    );
  }

  async deleteBoard(id) {
    this._boards = this._boards.filter((elem) => elem.id !== id);
  }

  // Task

  async getTasks(boardId) {
     this._tasks = this._tasks.filter((task) => task.boardId === boardId);
     return this._tasks;
  }

  async addTask(task) {
    await this._tasks.push(task);
    return task;
  }
}

export const database = new Database();
