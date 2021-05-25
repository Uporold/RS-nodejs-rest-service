import { v4 as uuid } from 'uuid';

/**
 * Class representing a user
 */
export class User {
  /**
   *
   * @param {string} id - user id
   * @param {string} name - user name
   * @param {string} login - user login
   * @param {string} password - user password
   */
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
