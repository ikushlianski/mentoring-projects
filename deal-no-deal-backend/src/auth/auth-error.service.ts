import {
  InvalidPasswordException,
  UsernameExistsException,
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

    console.log('error', error);

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
}
