import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { GetUser } from './get-user-decorator';
import { UserEntity } from '../users/user.entity';

@Controller('login')
@UseGuards(LocalAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@GetUser() user: UserEntity) {
    return this.authService.login(user);
  }
}
