import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): Promise<UserEntity[]> {
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() userDto: UserDto): Promise<UserEntity> {
    return this.usersService.create(userDto);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<UserEntity> {
    return this.usersService.getById(id);
  }

  @Put('/:id')
  updateUser(
    @Body() userDto: UserDto,
    @Param('id') id: string
  ): Promise<UserEntity> {
    return this.usersService.update(id, userDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.delete(id);
  }
}
