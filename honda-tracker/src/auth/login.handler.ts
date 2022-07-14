import { APIGatewayProxyEventV2WithRequestContext } from 'aws-lambda/trigger/api-gateway-proxy';
import { StatusCodes } from 'http-status-codes';
import { CookieKeys, cookieService } from '../lambda/cookie.service';
import { lambdaService } from '../lambda/lambda.service';
import { wrongUserOrPassword } from './auth.errors';
import { loginService } from './services/login.service';

exports.handler = async function (
  event: APIGatewayProxyEventV2WithRequestContext<unknown>,
) {
  const [error, domainUser] = loginService.getUserFromRequest(
    event.body,
    event.cookies,
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
        StatusCodes.UNAUTHORIZED,
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
          StatusCodes.UNAUTHORIZED,
        );
  }

  return lambdaService.toErrorResponse(
    new Error('Unknown login error'),
    StatusCodes.UNAUTHORIZED,
  );
};
