import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Stages } from '../src/constants';
import { Lambdas } from './types';

interface UserLambdaStackProps extends StackProps {
  stage: Stages;
  api: HttpApi;
}

export class UserLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(scope: Construct, id: string, props: UserLambdaStackProps) {
    super(scope, id, props);

    this.initGetUserLambda(props.api, props.stage);
  }

  private initGetUserLambda(httpApi: HttpApi, stage: Stages) {
    const getUserLambda = new NodejsFunction(
      this,
      `getUserLambda_${stage}`,
      {
        runtime: Runtime.NODEJS_16_X,
        handler: 'handler',
        entry: './src/user/get-user.handler.ts',
        functionName: `getUserLambda_${stage}`,
        environment: {
          stage,
        },
      },
    );

    this.lambdas.set('get-user', getUserLambda);

    const getUserLambdaIntegration = new HttpLambdaIntegration(
      `getUserLambda_${stage}`,
      getUserLambda,
    );

    if (httpApi) {
      httpApi.addRoutes({
        path: '/users/{id}',
        methods: [HttpMethod.GET],
        integration: getUserLambdaIntegration,
      });
    }

    return getUserLambda;
  }
}
