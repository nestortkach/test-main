import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.model'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(dto: LoginDto) {
    //* Find existing user
    const existingUser = await this.userService.findOneByEmail(dto.email)
    if (!existingUser) throw new UnauthorizedException('Invalid credentials')

    //* Check if password is correct
    const isPasswordValid = await bcrypt.compare(
      dto.password,
      existingUser.password,
    )
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials')

    //* Create and return access token 
    const accessToken = this.generateAccessToken(existingUser)
    return { accessToken }
  }

  async register(dto: RegisterDto) {
    const { email, name, password, phone } = dto

    //* Check if user with this email already exist
    await this.userService.validateUserByEmail(email)

    //* Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //* Creating new user
    const user = new User({ name, email, phone, password: hashedPassword })
    user.save()

    //* Generate access jwt token
    const accessToken = this.generateAccessToken(user)

    //* Return jwt token in response 
    return { accessToken }
  }

  private generateAccessToken(user: User): string {
    //* Get payload from user
    const payload = { email: user.email, id: user.id }
    
    //* Generate and return token
    return this.jwtService.sign(payload)
  }
}
