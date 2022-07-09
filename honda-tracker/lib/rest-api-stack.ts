import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { REST_API_NAME, Stages } from '../src/constants';

export class HttpApiStack extends Stack {
  restApi: HttpApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.restApi = new HttpApi(this, REST_API_NAME, {
      apiName: REST_API_NAME,
      createDefaultStage: true,
    });

    this.restApi.addStage(Stages.DEV, {
      stageName: Stages.DEV,
      autoDeploy: true,
    });
  }
}
