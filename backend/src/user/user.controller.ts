import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/common/decorators/auth.decorator'
import { CurrentUserEmail } from 'src/common/decorators/user.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async findOne(@CurrentUserEmail() email: string) {
    const user = await this.userService.findOneByEmail(email)
    const { password, ...data } = user.dataValues
    return data
  }
}
