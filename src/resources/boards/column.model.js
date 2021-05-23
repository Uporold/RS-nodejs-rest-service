import { v4 as uuid } from 'uuid';

export class Column {
  constructor({ id = uuid(), title = 'column title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static createColumns(columns) {
    return columns.map((column) => new Column(column));
  }
}
