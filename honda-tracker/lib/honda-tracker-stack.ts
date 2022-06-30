import { aws_dynamodb, Stack, StackProps } from "aws-cdk-lib";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as api from "aws-cdk-lib/aws-apigateway";
import { TABLE_NAME_DEV } from "../src/constants";

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
      tableName: TABLE_NAME_DEV,
    });

    const getBookingLambda = new NodejsFunction(this, "getBookingLambda", {
      runtime: Runtime.NODEJS_16_X,
      handler: "handler",
      entry: "src/booking/getBooking.ts",
      functionName: "getBookingLambda",
    });

    // Lambda grant invoke to APIGateway
    getBookingLambda.grantInvoke(
      new ServicePrincipal("apigateway.amazonaws.com")
    );

    // Lambda grant read/write to DynamoDB
    table.grantReadWriteData(getBookingLambda);

    const restApi = new api.RestApi(this, "HondaRestApi", {
      restApiName: `honda-rest-api`,
      deployOptions: {
        stageName: "dev",
      },
    });

    const getBookingLambdaIntegration = new api.LambdaIntegration(
      getBookingLambda
    );

    const bookingsPath = restApi.root.addResource("bookings");

    bookingsPath.addMethod("GET", getBookingLambdaIntegration);
  }
}
