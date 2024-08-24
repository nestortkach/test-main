import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
    
  @HttpCode(200)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }
}

