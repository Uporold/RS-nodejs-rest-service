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
import { BoardsService } from './boards.service';
import { BoardEntity } from './board.entity';
import { BoardDto } from './board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getBoards(): Promise<BoardEntity[]> {
    return this.boardsService.getAll();
  }

  @Post()
  createBoard(@Body() boardDto: BoardDto): Promise<BoardEntity> {
    return this.boardsService.create(boardDto);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: string): Promise<BoardEntity> {
    return this.boardsService.getById(id);
  }

  @Put('/:id')
  updateBoard(
    @Body() boardDto: BoardDto,
    @Param('id') id: string
  ): Promise<BoardEntity> {
    return this.boardsService.update(id, boardDto);
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardsService.delete(id);
  }
}
