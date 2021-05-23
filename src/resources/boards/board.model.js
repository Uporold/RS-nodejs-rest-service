import { v4 as uuid } from 'uuid';
import { Column } from './column.model.js';

export class Board {
  constructor({
    id = uuid(),
    title = 'board title',
    columns = [
      {
        title: 'string',
        order: 0,
      },
    ],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Column.createColumns(columns);
  }
}
