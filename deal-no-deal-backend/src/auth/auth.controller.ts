import { NotAuthorizedException } from '@aws-sdk/client-cognito-identity-provider';
import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Headers,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthErrorHandler } from 'src/auth/auth-error.service';
import { CognitoService } from 'src/auth/cognito.service';
import { jwtCookieName, refreshTokenHeaderName } from 'src/auth/constants';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: CognitoService,
    private readonly authErrorHandler: AuthErrorHandler,
  ) {}

  @Post('cognito/signup')
  @ApiTags('signup')
  @ApiOperation({ description: 'Sign up (create) user' })
  async signUp(
    @Res() response: Response,
    @Body() signUpUserDto: SignUpUserDto,
  ) {
    try {
      await this.authService.signUp(signUpUserDto);

      return response.sendStatus(HttpStatus.CREATED);
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
      const { accessToken, refreshToken, expires } =
        await this.authService.signIn(signInUserDto);

      response.cookie(jwtCookieName, accessToken, {
        httpOnly: true,
      });

      return response.status(HttpStatus.OK).send({
        refreshToken,
        expires,
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

  @Post('cognito/token/refresh')
  @ApiTags('token')
  @ApiOperation({
    description: 'Get a new access token using your refresh token',
  })
  async refreshToken(
    @Headers(refreshTokenHeaderName) refreshToken,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }

    try {
      const {
        AuthenticationResult: { AccessToken, ExpiresIn },
      } = await this.authService.refreshToken(refreshToken);

      response.cookie(jwtCookieName, AccessToken, {
        httpOnly: true,
      });

      return response.status(HttpStatus.OK).send({
        ExpiresIn,
      });
    } catch (e: unknown) {
      if (e instanceof NotAuthorizedException) {
        return response.status(HttpStatus.BAD_REQUEST).send(e.message);
      }

      return response
        .status(HttpStatus.BAD_REQUEST)
        .send('Could not refresh the token');
    }
  }

  @Post('cognito/signout')
  @ApiTags('signout')
  @ApiOperation({
    description: 'Sign out of the application',
  })
  async signOut(
    @Headers(refreshTokenHeaderName) refreshToken,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      throw new BadRequestException('No refresh token provided');
    }

    try {
      await this.authService.signOut(refreshToken);

      response.cookie(jwtCookieName, '', {
        httpOnly: true,
      });

      return response.sendStatus(HttpStatus.OK);
    } catch (e: unknown) {
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .send('Could not you log out');
    }
  }
}
