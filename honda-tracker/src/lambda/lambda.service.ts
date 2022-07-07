import { APIGatewayProxyStructuredResultV2 } from "aws-lambda/trigger/api-gateway-proxy";
import { StatusCodes } from "http-status-codes";

export class LambdaService {
  toSuccessResponse = (
    body: unknown,
    headers = {},
    code = StatusCodes.OK
  ): APIGatewayProxyStructuredResultV2 => {
    return {
      statusCode: code,
      headers,
      body: JSON.stringify(body),
    };
  };

  toErrorResponse = (
    error: unknown,
    code: StatusCodes
  ): APIGatewayProxyStructuredResultV2 => {
    return error instanceof Error
      ? {
          statusCode: code,
          body: error.message,
        }
      : {
          // should not happen
          statusCode: 500,
          body: "Unknown error",
        };
  };
}

export const lambdaService = new LambdaService();
