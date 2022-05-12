import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { AuthService } from 'src/auth/auth.service';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';

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

  @Post('cognito/signin')
  @ApiTags('signin')
  @ApiOperation({ description: 'Sign in (log in) user' })
  async signIn(@Body() signInUserDto: SignInUserDto) {
    try {
      return await this.authService.signInWithCognito(signInUserDto);
    } catch (error: unknown) {
      this.authErrorHandler.handleSignInError(error);
    }
  }
}
