import {
  AdminConfirmSignUpCommand,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';

const region = 'eu-west-1';

@Injectable()
export class CognitoService {
  cognitoClient: CognitoIdentityProviderClient;
  constructor() {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region,
    });
  }

  registerUser = async ({ username, password }: SignUpUserDto) => {
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

  signInUser = async ({ username, password }: SignInUserDto) => {
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
