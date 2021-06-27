import { StatusCodes } from 'http-status-codes';
import { getConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../users/user.repository';
import { CustomError } from '../../middlewares/error';
import { AuthCredentialsDto } from './auth.dto';
import { config } from '../../common/config';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getConnection().getCustomRepository(UserRepository);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    const { login, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ login });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { userId: user.id, login };
      const token = await jwt.sign(payload, config.JWT_SECRET_KEY);
      return { token };
    }
    throw new CustomError(
      StatusCodes.FORBIDDEN,
      'Check your login credentials'
    );
  }
}
