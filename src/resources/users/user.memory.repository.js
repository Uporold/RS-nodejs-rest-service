import { User } from './user.model.js';
import { Repository } from '../../common/repository.js';

/**
 * Class representing User Repository
 * @extends Repository
 */
export class UserRepository extends Repository {
  /**
   * Get all users
   * @returns {Promise<User[]>} - users array
   */
  async getAll() {
    return this.db.getUsers();
  }

  /**
   * Create new user
   * @param {User} user - user data transfer object
   * @returns {Promise<User>} - added user
   */
  async create(user) {
    return this.db.addUser(new User(user));
  }

  /**
   * Get user by id
   * @param {string} id - user id
   * @returns {Promise<User|undefined>} - if success returns found user, else - undefined
   */
  async getById(id) {
    return this.db.getUserById(id);
  }

  /**
   * Update user
   * @param {User} user - user data transfer object
   * @returns {Promise<void>}
   */
  async update(user) {
    return this.db.updateUser(user);
  }

  /**
   * Delete user by id
   * @param {string} id - user id
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    await this.db.deleteUser(id);
  }
}
