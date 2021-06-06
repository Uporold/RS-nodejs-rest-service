import { UserRepository } from './user.memory.repository';
import { CustomError } from '../../middlewares/error';
import { TasksService } from '../tasks/tasks.service';
import { User } from './user.model';
import { UserDto } from './user.dto';

export class UsersService {
  private userRepository: UserRepository;
  private tasksService: TasksService;

  constructor() {
    this.userRepository = new UserRepository();
    this.tasksService = new TasksService();
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async create(user: UserDto): Promise<User> {
    return this.userRepository.create(user);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new CustomError(404, `User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, user: UserDto): Promise<User> {
    const updatedUser = await this.getById(id);
    updatedUser.name = user.name;
    updatedUser.login = user.login;
    updatedUser.password = user.password;
    await this.userRepository.update(updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.getById(id);
    await this.userRepository.deleteUser(id);
    await this.tasksService.unassignUserTasks(id);
  }
}
