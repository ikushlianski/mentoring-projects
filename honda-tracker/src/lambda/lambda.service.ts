import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { StatusCodes } from 'http-status-codes';

export class LambdaService {
  toSuccessResponse = (
    body: unknown,
    headers = {},
    cookies: string[] = [],
    code = StatusCodes.OK,
  ): APIGatewayProxyStructuredResultV2 => {
    const isBodyString = (body: unknown): body is string => {
      return typeof body === 'string';
    };

    return {
      statusCode: code,
      // todo for now we only support one cookie (sessionId)
      headers: { ...headers, 'Set-Cookie': `${cookies[0]}` },
      body: isBodyString(body) ? body : JSON.stringify(body),
    };
  };

  toErrorResponse = (
    error: unknown,
    code: StatusCodes,
    // cookies: string[] = [],
  ): APIGatewayProxyStructuredResultV2 => {
    return error instanceof Error
      ? {
          statusCode: code,
          body: error.message,
          // cookies,
        }
      : {
          // should not happen
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          body: 'Unknown error',
          // cookies,
        };
  };
}

export const lambdaService = new LambdaService();
