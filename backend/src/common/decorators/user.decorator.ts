import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUserEmail = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const user = request.user

    if (user && user.email) {
      return user.email
    }
    return null
  },
)
