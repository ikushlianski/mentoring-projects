import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda/trigger/api-gateway-proxy';
import { StatusCodes } from 'http-status-codes';

export class LambdaService {
  toSuccessResponse = (
    body: unknown,
    headers = {},
    // cookies = [],
    code = StatusCodes.OK,
  ): APIGatewayProxyStructuredResultV2 => {
    const isBodyString = (body: unknown): body is string => {
      return typeof body === 'string';
    };

    return {
      statusCode: code,
      headers,
      // cookies,
      body: isBodyString(body) ? body : JSON.stringify(body),
    };
  };

  toErrorResponse = (
    error: unknown,
    code: StatusCodes,
    // cookies = [],
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
