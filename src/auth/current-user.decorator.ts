import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type CurrentUserType = {
  id: string;
  email: string;
  createdAt: Date;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as CurrentUserType; // Extract the user object from the request
  },
);
