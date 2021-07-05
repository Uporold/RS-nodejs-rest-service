import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './auth.dto';
import { AuthService } from './auth.service';
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{ token: string }> {
    return this.authService.login(authCredentialsDto);
  }
}
