import { Stack, StackProps } from "aws-cdk-lib";
import * as api from "aws-cdk-lib/aws-apigateway";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";
import { REST_API_NAME, Stages } from "../src/constants";

export class RestApiStack extends Stack {
  restApi: RestApi;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.restApi = new api.RestApi(this, REST_API_NAME, {
      restApiName: REST_API_NAME,
      deployOptions: {
        stageName: Stages.DEV,
      },
    });
  }
}
