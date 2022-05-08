import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authErrorHandler: AuthErrorHandler,
  ) {}

  @Post('cognito/signup')
  @ApiTags('signup')
  @ApiOperation({ description: 'Sign up (create) user' })
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      return await this.authService.signUpWithCognito(signUpUserDto);
    } catch (error: unknown) {
      this.authErrorHandler.handleSignUpError(error);
    }
  }
}
