import { v4 as uuid } from 'uuid';
import { ColumnDto } from './board.dto';

export class Column {
  public id: string;
  public title: string;
  public order: number;

  constructor({ id = uuid(), title = 'column title', order = 0 }: ColumnDto) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static createColumns(columns: ColumnDto[]): Column[] {
    return columns.map((column) => new Column(column));
  }
}
