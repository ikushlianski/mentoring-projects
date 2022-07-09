import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Stages } from '../src/constants';
import { Lambdas } from './types';

interface BookingLambdaStackProps extends StackProps {
  stage: Stages;
  api: HttpApi;
}

export class BookingLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(
    scope: Construct,
    id: string,
    props: BookingLambdaStackProps,
  ) {
    super(scope, id, props);

    this.initGetBookingLambda(props.api, props.stage);
  }

  private initGetBookingLambda(httpApi: HttpApi, stage: Stages) {
    const getBookingLambda = new NodejsFunction(this, 'getBookingLambda', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      entry: './src/booking/get-booking.ts',
      functionName: `getBookingLambda_${stage}`,
    });

    this.lambdas.set('get-booking', getBookingLambda);

    const getBookingLambdaIntegration = new HttpLambdaIntegration(
      'getBookingLambda',
      getBookingLambda,
    );

    if (httpApi) {
      httpApi.addRoutes({
        path: 'bookings/{id}',
        methods: [HttpMethod.GET],
        integration: getBookingLambdaIntegration,
      });
    }

    return getBookingLambda;
  }
}
