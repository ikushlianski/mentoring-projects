import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { CookieKeys, cookieService } from '../lambda/cookie.service';
import { lambdaService } from '../lambda/lambda.service';
import { wrongUserOrPassword } from './auth.errors';
import { loginService } from './services/login.service';

exports.handler = async function (event: APIGatewayEvent) {
  const [error, domainUser] = loginService.getUserFromRequest(
    event.body,
    event.headers['Cookie'],
  );

  if (error) {
    return lambdaService.toErrorResponse(error, StatusCodes.BAD_REQUEST);
  } else if (domainUser) {
    console.log({ domainUser });
    const [loginError, loginSuccess] = await loginService.logIn(
      domainUser,
    );

    console.log({ loginSuccess });

    if (loginError) {
      console.log({ loginError });
      return lambdaService.toErrorResponse(
        wrongUserOrPassword,
        StatusCodes.BAD_REQUEST,
      );
    }

    return loginSuccess
      ? lambdaService.toSuccessResponse('Success', undefined, [
          cookieService.makeCookie(
            CookieKeys.SESSION_ID,
            loginSuccess.sessionId,
          ),
        ])
      : lambdaService.toErrorResponse(
          wrongUserOrPassword,
          StatusCodes.BAD_REQUEST,
        );
  }

  return lambdaService.toErrorResponse(
    new Error('Unknown login error'),
    StatusCodes.BAD_REQUEST,
  );
};
