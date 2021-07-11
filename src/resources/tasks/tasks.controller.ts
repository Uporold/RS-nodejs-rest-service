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
import { TasksService } from './tasks.service';
import { TaskEntity } from './task.entity';
import { GetBoardId } from './get-board-id.decorator';
import { TaskDto } from './task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@GetBoardId() boardId: string): Promise<TaskEntity[]> {
    return this.tasksService.getAll(boardId);
  }

  @Post()
  createTask(
    @Body() taskDto: TaskDto,
    @GetBoardId() boardId: string
  ): Promise<TaskEntity> {
    return this.tasksService.create(boardId, taskDto);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetBoardId() boardId: string
  ): Promise<TaskEntity> {
    return this.tasksService.getById(id, boardId);
  }

  @Put('/:id')
  updateTask(
    @Body() taskDto: TaskDto,
    @Param('id') id: string,
    @GetBoardId() boardId: string
  ): Promise<TaskEntity> {
    return this.tasksService.update(id, boardId, taskDto);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string,
    @GetBoardId() boardId: string
  ): Promise<void> {
    return this.tasksService.delete(id, boardId);
  }
}
