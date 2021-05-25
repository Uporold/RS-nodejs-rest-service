/**
 * Class representing a database
 */
class Database {
  constructor() {
    /**
     *
     * @type {User[]}
     * @private
     */
    this._users = [];
    /**
     *
     * @type {Board[]}
     * @private
     */
    this._boards = [];
    /**
     *
     * @type {Task[]}
     * @private
     */
    this._tasks = [];
  }

  // User
  /**
   * Show all users from in-memory-database
   * @returns {Promise<User[]>} Array of users
   */
  async getUsers() {
    return this._users;
  }

  /**
   * Add transferred user to in-memory-database
   * @param {User} user - added user
   * @returns {Promise<User>} - added user
   */
  async addUser(user) {
    await this._users.push(user);
    return user;
  }

  /**
   * Get user by id from in-memory-database
   * @param {string} id - user id
   * @returns {Promise<User | undefined>} - if success returns found user, else - undefined
   */
  async getUserById(id) {
    return this._users.find((user) => user.id === id);
  }

  /**
   * Update user
   * @param {User} user - updated user
   * @returns {Promise<void>}
   */
  async updateUser(user) {
    this._users = this._users.map((elem) =>
      elem.id === user.id ? user : elem
    );
  }

  /**
   * Delete user by id
   * @param {string} id - user id
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    this._users = this._users.filter((elem) => elem.id !== id);
  }

  // Board


  /**
   * Show all boards from in-memory-database
   * @returns {Promise<Board[]>} - boards array
   */
  async getBoards() {
    return this._boards;
  }

  /**
   * Add transferred board to in-memory-database
   * @param {Board} board - added board
   * @returns {Promise<Board>} - added board
   */
  async addBoard(board) {
    await this._boards.push(board);
    return board;
  }

  /**
   * Get board by id from in-memory-database
   * @param {string} id - board id
   * @returns {Promise<Board | undefined>} - if success returns found board, else - undefined
   */
  async getBoardById(id) {
    return this._boards.find((board) => board.id === id);
  }

  /**
   * Update board
   * @param {Board} board - updated board
   * @returns {Promise<void>}
   */
  async updateBoard(board) {
    this._boards = this._boards.map((elem) =>
      elem.id === board.id ? board : elem
    );
  }

  /**
   * Delete board by id
   * @param {string} id - board id
   * @returns {Promise<void>}
   */
  async deleteBoard(id) {
    this._boards = this._boards.filter((elem) => elem.id !== id);
  }

  // Task

  /**
   * Remove all tasks with transferred board id which is deleted
   * @param {string} boardId - deleted board id
   * @returns {Promise<void>}
   */
  async removeByBoard(boardId) {
    this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
  }

  /**
   * Set all tasks userId to null by transferred userId which is deleted
   * @param {string} userId - deleted user id
   * @returns {Promise<void>}
   */
  async unassignUserTasks(userId) {
    this._tasks = this._tasks.map((task) =>
      task.userId === userId ? { ...task, userId: null } : task
    );
  }

  /**
   * Show all board tasks from in-memory-database
   * @param {string} boardId - board id
   * @returns {Promise<Task[]>} - array of tasks
   */
  async getTasks(boardId) {
    this._tasks = this._tasks.filter((task) => task.boardId === boardId);
    return this._tasks;
  }

  /**
   * Add task to in-memory-database
   * @param {Task} task - added task
   * @returns {Promise<Task>} - added task
   */
  async addTask(task) {
    await this._tasks.push(task);
    return task;
  }

  /**
   * Get task in board by task id and board id
   * @param {string} id - task id
   * @param {string} boardId - board id
   * @returns {Promise<Task | undefined>} - if success returns found task, else - undefined
   */
  async getTaskById(id, boardId) {
    return this._tasks.find(
      (task) => task.id === id && task.boardId === boardId
    );
  }

  /**
   * Update task
   * @param {Task} task - updated task
   * @returns {Promise<void>}
   */
  async updateTask(task) {
    this._tasks = this._tasks.map((elem) =>
      task.id === elem.id ? task : elem
    );
  }

  /**
   * Delete task by id
   * @param {string} id - task id
   * @returns {Promise<void>}
   */
  async deleteTask(id) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }
}

/**
 * Database object
 * @type {Database}
 */
export const database = new Database();
