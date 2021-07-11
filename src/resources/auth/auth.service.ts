import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async login(user: UserEntity): Promise<{ token: string }> {
    const payload = { userId: user.id, login: user.login };
    const token = await this.jwtService.signAsync(payload);
    return { token };
  }

  async validateUser(
    login: string,
    password: string
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
