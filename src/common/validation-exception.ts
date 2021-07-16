import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: ValidationError[]) {
    super();
  }
  public getMessage(): string {
    return this.validationErrors
      .map((error) => {
        return error.toString();
      })
      .join('');
  }
}
