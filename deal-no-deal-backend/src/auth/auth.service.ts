import {
  AdminConfirmSignUpCommand,
  AdminConfirmSignUpCommandOutput,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';

const region = 'eu-west-1';

@Injectable()
export class AuthService {
  signUpWithCognito = async ({
    username,
    password,
  }: SignUpUserDto): Promise<AdminConfirmSignUpCommandOutput> => {
    const client = new CognitoIdentityProviderClient({
      region,
    });

    const signUpCommand = new SignUpCommand({
      Username: username,
      Password: password,
      ClientId: process.env.COGNITO_CLIENT_ID,
    });

    await client.send(signUpCommand);

    const confirmSignUpCommand = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });

    return await client.send(confirmSignUpCommand);
  };

  signInWithCognito = async ({ username, password }: SignInUserDto) => {
    const client = new CognitoIdentityProviderClient({
      region,
    });

    const signInCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    return await client.send(signInCommand);
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
    const client = new CognitoIdentityProviderClient({
      region,
    });

    const refreshTokenCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.REFRESH_TOKEN_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    });

    return await client.send(refreshTokenCommand);
  };

  signOut = async (refreshToken: string) => {
    const cognitoDomain = process.env.COGNITO_DOMAIN;
    const clientId = process.env.COGNITO_CLIENT_ID;

    if (!cognitoDomain || !clientId) {
      throw new Error('Cognito configuration is invalid');
    }

    await fetch(
      `${cognitoDomain}.auth.eu-west-1.amazoncognito.com/oauth2/revoke`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          token: refreshToken,
          client_id: clientId,
        }),
      },
    );
  };
}
