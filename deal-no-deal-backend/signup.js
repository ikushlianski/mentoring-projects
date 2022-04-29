import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'eu-west-1',
});

const command = new SignUpCommand({
  ClientId: process.env.COGNITO_CLIENT_ID,
  Password: process.env.TF_VAR_COGNITO_DEFAULT_USER_PASSWORD,
  Username: process.env.TF_VAR_COGNITO_DEFAULT_USER_NAME,
  UserAttributes: [
    {
      Name: 'email',
      Value: process.env.TF_VAR_COGNITO_DEFAULT_USER_EMAIL,
    },
  ],
});

const response = await client.send(command);

console.log('response', response);
