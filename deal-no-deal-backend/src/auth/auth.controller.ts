import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cognito/signup')
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      return this.authService.signUpWithCognito(signUpUserDto);
    } catch (error: unknown) {
      console.log('Error during sign up', error);

      throw new UnauthorizedException('Error occurred when signing you up');
    }
  }
}
