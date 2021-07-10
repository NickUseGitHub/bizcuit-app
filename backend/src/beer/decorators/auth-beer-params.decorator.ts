import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthBeerParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.authBeer;
  },
);
