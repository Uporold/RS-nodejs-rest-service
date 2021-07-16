import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetBoardId = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const { boardId } = req.params;
    return boardId;
  }
);
