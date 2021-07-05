import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

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
        throw new ConflictException('User with this login already exists');
      }
    }
    return user;
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, userDto: UserDto): Promise<UserEntity> {
    const { login, name, password } = userDto;
    const updatedUser = await this.getById(id);
    const hashedPassword = password
      ? await bcrypt.hash(password, await bcrypt.genSalt())
      : undefined;
    Object.assign(
      updatedUser,
      hashedPassword
        ? {
            login,
            name,
            password: (await bcrypt.compare(password, updatedUser.password))
              ? updatedUser.password
              : hashedPassword,
          }
        : userDto
    );
    try {
      await this.userRepository.save(updatedUser);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('User with this login already exists');
      }
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
