import { aws_dynamodb, Stack, StackProps } from "aws-cdk-lib";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
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

    const getBookingLambda = new lambda.Function(this, "getBookingLambda", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("src/booking"),
      handler: "getBooking.handler",
    });

    // IMPORTANT: Lambda grant invoke to APIGateway
    getBookingLambda.grantInvoke(
      new ServicePrincipal("apigateway.amazonaws.com")
    );

    const restApi = new api.RestApi(this, "HondaRestApi", {
      restApiName: `honda-rest-api`,
      cloudWatchRole: false,
    });

    const integration = new api.LambdaIntegration(getBookingLambda);

    const bookingsPath = restApi.root.addResource("bookings");

    bookingsPath.addMethod("GET", integration);

    // todo extract into a separate file
    const deployment = new api.Deployment(this, "Deployment", {
      api: restApi,
    });

    const devStage = new api.Stage(this, "dev", {
      deployment,
      stageName: "dev",
    });

    restApi.deploymentStage = devStage;
  }
}
