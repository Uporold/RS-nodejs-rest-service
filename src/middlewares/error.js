/**
 * Class representing custom error
 * @extends Error
 */
export class CustomError extends Error {
  /**
   *
   * @param {number} statusCode - error code
   * @param {string} message - error message
   */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Error middleware
 * @param {CustomError} err - thrown custom error
 * @param {Response} res - express response
 */
export const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
