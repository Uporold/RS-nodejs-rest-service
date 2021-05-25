import { v4 as uuid } from 'uuid';

/**
 * Class representing a Task
 */
export class Task {
  /**
   *
   * @param {string} id - task id
   * @param {string} title - task title
   * @param {number} order - task order
   * @param {string} description - task description
   * @param {string | null} userId - task creator id
   * @param {string | null} boardId - board id which containing task
   * @param {string | null} columnId - column id which containing task
   */
  constructor({
    id = uuid(),
    title = 'task title',
    order = 0,
    description = 'task description',
    userId = null,
    boardId = null,
    columnId = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}
