/**
 * @typedef {Object} UserDto
 * @property {string} name - user name
 * @property {string} login - user login
 * @property {string} password - user password
 */

/**
 * @typedef {Object} ColumnDto
 * @property {string} title - column title
 * @property {number} order - column order
 */

/**
 * @typedef {Object} BoardDto
 * @property {string} title - board title
 * @property {ColumnDto[]} columns - board columns
 */

/**
 * @typedef {Object} TaskDto
 * @property {string} title - task title
 * @property {number} order - task order
 * @property {string} description - task description
 * @property {string} userId - task creator id
 * @property {string} boardId - board id which containing task
 * @property {string} columnId - column id which containing task
 */
