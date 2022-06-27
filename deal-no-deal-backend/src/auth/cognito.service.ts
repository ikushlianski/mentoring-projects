import {
  AdminConfirmSignUpCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { AuthService, SignInResult, SignUpResult } from 'src/auth/auth.types';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';
import { authErrors } from 'src/auth/errors';
import { DatabaseService } from 'src/db/db.service';
import { PrismaService } from 'src/db/prisma.service';

const region = 'eu-west-1';

@Injectable()
export class CognitoService extends AuthService {
  cognitoClient: CognitoIdentityProviderClient;

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseService: DatabaseService,
  ) {
    super();

    this.cognitoClient = new CognitoIdentityProviderClient({
      region,
    });
  }

  override signUp = async ({
    username,
    password,
  }: SignUpUserDto): Promise<SignUpResult> => {
    const userAlreadyExists = await this.databaseService.checkUserExists(
      username,
    );

    if (userAlreadyExists) {
      throw new BadRequestException(authErrors.userAlreadyExists);
    }

    await this.registerUser({ username, password });

    const { username: createdUser, id } = await this.databaseService.createUser(
      { username },
    );

    return {
      id,
      username: createdUser,
    };
  };

  override signIn = async ({
    username,
    password,
  }: SignInUserDto): Promise<SignInResult> => {
    const {
      AuthenticationResult: { AccessToken, RefreshToken, ExpiresIn },
    } = await this.signInUser({ username, password });

    return {
      accessToken: AccessToken,
      refreshToken: RefreshToken,
      expires: ExpiresIn,
    };
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

  override signOut = async (refreshToken: string) => {
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
      return;
    }

    throw new Error(response.statusText);
  };

  private registerUser = async ({ username, password }: SignUpUserDto) => {
    const signUpCommand = new SignUpCommand({
      Username: username,
      Password: password,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });

    await this.cognitoClient.send(signUpCommand);

    const confirmSignUpCommand = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });

    await this.cognitoClient.send(confirmSignUpCommand);
  };

  private signInUser = async ({ username, password }: SignInUserDto) => {
    const signInCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    return await this.cognitoClient.send(signInCommand);
  };

  refreshToken = async (refreshToken: string) => {
    const refreshTokenCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    return await this.cognitoClient.send(refreshTokenCommand);
  };
}
