import { v4 as uuid } from 'uuid';
import { Column } from './column.model.js';

/**
 * Class representing a board
 */
export class Board {
  /**
   *
   * @param {string} id - board id
   * @param {string} title - board title
   * @param {ColumnDto[]} columns - board columns
   */
  constructor({
    id = uuid(),
    title = 'board title',
    columns = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = Column.createColumns(columns);
  }
}
