import {
  AdminConfirmSignUpCommand,
  AdminConfirmSignUpCommandOutput,
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import { SignInUserDto } from 'src/auth/dto/signInUserDto';
import { SignUpUserDto } from 'src/auth/dto/signUpUserDto';

@Injectable()
export class AuthService {
  signUpWithCognito = async ({
    username,
    password,
  }: SignUpUserDto): Promise<AdminConfirmSignUpCommandOutput> => {
    const client = new CognitoIdentityProviderClient({
      region: 'eu-west-1',
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
      region: 'eu-west-1',
    });

    const signInCommand = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    const result = await client.send(signInCommand);

    console.log({ result });
  };
}
