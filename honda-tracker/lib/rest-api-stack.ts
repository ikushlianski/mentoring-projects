import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { REST_API_NAME, Stages } from '../src/constants';

interface HttpApiProps extends StackProps {
  stage: Stages;
}

export class HttpApiStack extends Stack {
  httpApi: HttpApi;

  constructor(scope: Construct, id: string, props: HttpApiProps) {
    super(scope, id, props);

    const { stage } = props;
    const apiName = `${REST_API_NAME}_${stage}`;

    this.httpApi = new HttpApi(this, apiName, {
      apiName,
      createDefaultStage: false,
    });

    this.httpApi.addStage(props.stage, {
      stageName: stage,
      autoDeploy: true,
    });
  }
}
