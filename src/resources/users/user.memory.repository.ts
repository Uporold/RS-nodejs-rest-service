import { User } from './user.model';
import { Repository } from '../../common/repository';
import { UserDto } from './user.dto';

export class UserRepository extends Repository {
  async getAll(): Promise<User[]> {
    return this.db.getUsers();
  }

  async create(user: UserDto): Promise<User> {
    const newUser = new User(user);
    return this.db.addUser(newUser);
  }

  async getById(id: string): Promise<User | undefined> {
    return this.db.getUserById(id);
  }

  async update(user: User): Promise<void> {
    return this.db.updateUser(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.deleteUser(id);
  }
}
