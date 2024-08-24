import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findOneByEmail(email: string) {
    let user: User
    user = await this.userModel.findOne({ where: { email } })

    return user
  }

  async validateUserByEmail(email: string) {
    const existingUser = await this.userModel.findOne({ where: { email } })

    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }
  }
}
