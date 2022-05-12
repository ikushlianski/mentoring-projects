import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

export type CognitoSignInResponse = Pick<
  InitiateAuthCommandOutput['AuthenticationResult'],
  'AccessToken' | 'RefreshToken' | 'ExpiresIn'
>;
