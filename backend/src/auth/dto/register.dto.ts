import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsString()
  @IsNotEmpty()
  password: string
}
