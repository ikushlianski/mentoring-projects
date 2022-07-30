import { APIGatewayEvent } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { lambdaService } from '../lambda/lambda.service';

exports.handler = async function (event: APIGatewayEvent) {
  if (!event.pathParameters) {
    return lambdaService.toErrorResponse(
      new Error('No user provided'),
      StatusCodes.BAD_REQUEST,
    );
  }

  return lambdaService.toSuccessResponse();
};
