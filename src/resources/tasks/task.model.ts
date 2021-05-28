import { v4 as uuid } from 'uuid';
import { TaskWithBoardDto } from './task.dto';

export class Task {
  public id: string;
  public title: string;
  public order: number;
  public description: string;
  public userId: string | null;
  public boardId: string;
  public columnId: string;

  constructor({
    title = 'task title',
    order = 0,
    description = 'task description',
    userId = null,
    boardId = '1',
    columnId = '1',
  }: TaskWithBoardDto) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
