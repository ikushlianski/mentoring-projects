import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Stages } from '../src/constants';
import { Lambdas } from './types';

interface AuthLambdaStackProps extends StackProps {
  stage: Stages;
  api: HttpApi;
}

export class AuthLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(scope: Construct, id: string, props: AuthLambdaStackProps) {
    super(scope, id, props);

    this.initLoginLambda(props.api, props.stage);
  }

  private initLoginLambda(httpApi: HttpApi, stage: Stages) {
    const loginLambda = new NodejsFunction(this, `loginLambda_${stage}`, {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      entry: './src/auth/login.handler.ts',
      functionName: `loginLambda_${stage}`,
      environment: {
        stage,
      },
    });

    this.lambdas.set('login', loginLambda);

    const loginLambdaIntegration = new HttpLambdaIntegration(
      `loginLambda_${stage}`,
      loginLambda,
    );

    if (httpApi) {
      httpApi.addRoutes({
        path: '/login',
        methods: [HttpMethod.POST],
        integration: loginLambdaIntegration,
      });
    }

    return loginLambda;
  }
}
