import { v4 as uuid } from 'uuid';
import { Column } from './column.model';
import { BoardDto, ColumnDto } from './board.dto';

export class Board {
  public id?: string;
  public title: string;
  public columns: ColumnDto[];

  constructor({ title = 'board title', columns = [] }: BoardDto) {
    this.id = uuid();
    this.title = title;
    this.columns = Column.createColumns(columns);
  }
}
