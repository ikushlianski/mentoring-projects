import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { AuthService } from 'src/auth/auth.service';
import { jwtCookieName } from 'src/auth/constants';
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
  async signIn(
    @Body() signInUserDto: SignInUserDto,
    @Res() response: Response,
  ) {
    try {
      const {
        AuthenticationResult: { AccessToken, RefreshToken, ExpiresIn },
      } = await this.authService.signInWithCognito(signInUserDto);

      response.cookie(jwtCookieName, AccessToken, {
        httpOnly: true,
      });

      return response.status(200).send({
        RefreshToken,
        ExpiresIn,
      });
    } catch (error: unknown) {
      this.authErrorHandler.handleSignInError(error);
    }
  }

  @Post('cognito/token/verify')
  @ApiTags('token')
  @ApiOperation({ description: 'Verify access token' })
  async verifyToken(@Req() { cookies }: Request, @Res() response: Response) {
    const token = cookies[jwtCookieName];

    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    const valid = await this.authService.isCognitoTokenValid(token);

    if (!valid) {
      throw new UnauthorizedException('Invalid access token');
    }

    return response.sendStatus(HttpStatus.OK);
  }
}
