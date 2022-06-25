import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { CognitoService } from 'src/auth/cognito.service';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { authErrors } from 'src/auth/errors';
import { DatabaseService } from 'src/db/db.service';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AuthCore {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cognitoService: CognitoService,
    private readonly databaseService: DatabaseService,
  ) {}

  signUpWithCognito = async ({ username, password }: SignUpUserDto) => {
    const userAlreadyExists = await this.databaseService.checkUserExists(
      username,
    );

    if (userAlreadyExists) {
      throw new BadRequestException(authErrors.userAlreadyExists);
    }

    await this.cognitoService.registerUser({ username, password });

    await this.databaseService.createUser({ username });
  };

  signInWithCognito = async ({ username, password }: SignInUserDto) => {
    return await this.cognitoService.signInUser({ username, password });
  };

  isCognitoTokenValid = async (token: string) => {
    const verifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: 'access',
    });

    try {
      await verifier.verify(token);

      return true;
    } catch {
      return false;
    }
  };

  refreshToken = async (refreshToken: string) => {
    return await this.cognitoService.refreshToken(refreshToken);
  };

  signOut = async (refreshToken: string) => {
    const cognitoDomain = process.env.COGNITO_DOMAIN;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!cognitoDomain || !clientId) {
      throw new Error('Cognito configuration is invalid');
    }

    const url = new URL(
      `https://${cognitoDomain}.auth.eu-west-1.amazoncognito.com/oauth2/revoke`,
    );

    url.searchParams.append('token', refreshToken);
    url.searchParams.append('client_id', clientId);

    const response = await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (response.status === HttpStatus.OK) {
      return await response.text();
    }

    throw new Error(response.statusText);
  };
}
