import { v4 as uuid } from 'uuid';

/**
 * Class representing a column
 */
export class Column {
  /**
   *
   * @param {string} id - column id
   * @param {string} title - column title
   * @param {number} order - column order
   */
  constructor({ id = uuid(), title = 'column title', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static createColumns(columns) {
    return columns.map((column) => new Column(column));
  }
}
