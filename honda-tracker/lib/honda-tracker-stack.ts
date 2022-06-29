import { aws_dynamodb, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";
import { ApiGatewayToLambda } from "@aws-solutions-constructs/aws-apigateway-lambda";

export class HondaTrackerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const table = new aws_dynamodb.Table(this, "honda_tracker_dev_table", {
      partitionKey: {
        name: "pk",
        type: aws_dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const { apiGateway, lambdaFunction } = new ApiGatewayToLambda(
      this,
      "ApiGatewayToLambdaPattern",
      {
        lambdaFunctionProps: {
          runtime: lambda.Runtime.NODEJS_16_X,
          handler: "handlers.getBooking",
          code: lambda.Code.fromAsset(`src/booking`),
        },
        apiGatewayProps: {
          defaultMethodOptions: {
            authorizationType: api.AuthorizationType.NONE,
          },
          restApiName: "honda-rest-api",
        },
      }
    );

    // todo extract into a separate file
    const deployment = new api.Deployment(this, "Deployment", {
      api: apiGateway,
    });

    const devStage = new api.Stage(this, "dev", {
      deployment,
      stageName: "dev",
    });

    apiGateway.deploymentStage = devStage;
  }
}
