import { v4 as uuid } from 'uuid';
import { UserDto, UserResponse } from './user.dto';

export class User {
  public id;
  public name;
  public login;
  public password;

  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: UserDto) {
    this.id = uuid();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): UserResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
