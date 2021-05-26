import { UserRepository } from './user.memory.repository.js';
import { CustomError } from '../../middlewares/error.js';
import { TasksService } from '../tasks/tasks.service.js';

/**
 * Class representing Users Service
 */
export class UsersService {
  constructor() {
    this.userRepository = new UserRepository();
    this.tasksService = new TasksService();
  }

  /**
   * Get all users
   * @returns {Promise<User[]>} - users array
   */
  async getAll() {
    return this.userRepository.getAll();
  }

  /**
   * Create new user
   * @param {UserDto} user - user data transfer object
   * @returns {Promise<User>} - created user
   */
  async create(user) {
    return this.userRepository.create(user);
  }

  /**
   * Get user by id
   * @param {string} id - user id
   * @throws {CustomError} - will throw an error if not found user with given id
   * @returns {Promise<User>} - found user
   */
  async getById(id) {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new CustomError(404, `User with id ${id} not found`);
    }
    return user;
  }

  /**
   * Update user
   * @param {string} id
   * @param {UserDto} user
   * @throws {CustomError} - will throw an error if not found user with given id
   * @returns {Promise<User>} - updated user
   */
  async update(id, user) {
    const updatedUser = await this.getById(id);
    updatedUser.name = user.name;
    updatedUser.login = user.login;
    updatedUser.password = user.password;
    await this.userRepository.update(updatedUser);
    return updatedUser;
  }

  /**
   * Delete user
   * @param {string} id - user id
   * @throws {CustomError} - will throw an error if not found user with given id
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    await this.getById(id);
    await this.userRepository.deleteUser(id);
    await this.tasksService.unassignUserTasks(id);
  }
}
