import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cognito/signup')
  @ApiTags('signup')
  @ApiOperation({ description: 'Sign up (create) the user' })
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    try {
      console.log('signUpUserDto', signUpUserDto);
      // return this.authService.signUpWithCognito(signUpUserDto);
    } catch (error: unknown) {
      console.log('Error during sign up', error);

      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException('Error occurred when signing you up');
    }
  }
}
