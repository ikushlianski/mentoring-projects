import {
  AdminConfirmSignUpCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: 'eu-west-1',
});
const command = new AdminConfirmSignUpCommand({
  UserPoolId: 'eu-west-1_XmOchO9kr',
  Username: 'maria',
});
const response = await client.send(command);

console.log('response', response);
