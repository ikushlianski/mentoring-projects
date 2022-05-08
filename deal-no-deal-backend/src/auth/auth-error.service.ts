import {
  InvalidPasswordException,
  NotAuthorizedException,
  UsernameExistsException,
  UserNotFoundException,
} from '@aws-sdk/client-cognito-identity-provider';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthErrorHandler {
  handleSignUpError = (error: unknown): void => {
    // todo add cloud logging

    console.log('sign up error', error);

    if (error instanceof InvalidPasswordException) {
      throw new BadRequestException(
        'Your password should be more than 6 characters long and contain at least one uppercase letter',
      );
    }

    if (error instanceof UsernameExistsException) {
      throw new BadRequestException('This username is already taken');
    }

    throw new UnauthorizedException('Error signing you up');
  };

  handleSignInError = (error: unknown): void => {
    // todo add cloud logging

    console.log('sign in error', error);

    const wrongUser = error instanceof UserNotFoundException;
    const wrongPassword = error instanceof NotAuthorizedException;

    if (wrongUser || wrongPassword) {
      throw new UnauthorizedException('Wrong user or password');
    }

    throw new UnauthorizedException('Error signing you in');
  };
}
