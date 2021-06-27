import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { CustomError } from '../../middlewares/error';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

export class UsersService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async create(userDto: UserDto): Promise<UserEntity> {
    const { login, name, password } = userDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      login,
      name,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new CustomError(
          StatusCodes.CONFLICT,
          'User with this login already exists'
        );
      }
    }
    return user;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `User with id ${id} not found`
      );
    }
    return user;
  }

  async update(id: string, userDto: UserDto): Promise<UserEntity> {
    const updatedUser = await this.getById(id);
    Object.assign(updatedUser, userDto);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new CustomError(
        StatusCodes.NOT_FOUND,
        `User with id ${id} not found`
      );
    }
  }
}
