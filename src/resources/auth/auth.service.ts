import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../users/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from '../users/user.repository';
// import { AuthCredentialsDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async login(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    const { login, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user.id, login };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    }
    throw new ForbiddenException('Check your login credentials');
  }
}
