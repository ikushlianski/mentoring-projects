import { Stack, StackProps } from 'aws-cdk-lib';
import { RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as api from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import { Stages } from '../src/constants';
import { Lambdas } from './types';

interface AuthLambdaStackProps extends StackProps {
  stage: Stages;
  api: RestApi;
}

export class AuthLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(scope: Construct, id: string, props: AuthLambdaStackProps) {
    super(scope, id, props);

    this.initLoginLambda(props.api, props.stage);
  }

  private initLoginLambda(restApi: RestApi, stage: Stages) {
    const loginLambda = new NodejsFunction(this, 'loginLambda', {
      runtime: Runtime.NODEJS_16_X,
      handler: 'handler',
      entry: './src/auth/login.ts',
      functionName: `loginLambda_${stage}`,
      environment: {
        stage,
      },
    });

    this.lambdas.set('login', loginLambda);

    const loginLambdaIntegration = new api.LambdaIntegration(loginLambda);

    if (restApi) {
      const loginPath = restApi.root.addResource('login');

      loginPath.addMethod('POST', loginLambdaIntegration);
    }

    return loginLambda;
  }
}
