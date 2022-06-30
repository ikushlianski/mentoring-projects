import { aws_dynamodb, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import * as api from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { REST_API_NAME, Stages, TABLE_NAME } from "../src/constants";

interface HondaStackProps extends StackProps {
  stage?: string;
}

export class HondaTrackerStack extends Stack {
  static tableName: string;
  table: Table;
  api: RestApi;

  constructor(scope: Construct, id: string, props?: HondaStackProps) {
    super(scope, id, props);

    HondaTrackerStack.tableName = `${TABLE_NAME}_${props?.stage}`;

    this.table = this.buildTable();
    this.api = this.buildRestApi();

    const getBookingLambda = new NodejsFunction(this, "getBookingLambda", {
      runtime: Runtime.NODEJS_16_X,
      handler: "handler",
      entry: "./src/booking/get-booking.ts",
      functionName: "getBookingLambda",
    });

    // Lambda grant invoke to APIGateway
    getBookingLambda.grantInvoke(
      new ServicePrincipal("apigateway.amazonaws.com")
    );

    // Lambda grant read/write to DynamoDB
    this.table.grantReadWriteData(getBookingLambda);

    const getBookingLambdaIntegration = new api.LambdaIntegration(
      getBookingLambda
    );

    const bookingsPath = this.api.root.addResource("bookings");

    bookingsPath.addMethod("GET", getBookingLambdaIntegration);
  }

  private buildTable = () => {
    return new aws_dynamodb.Table(this, HondaTrackerStack.tableName, {
      tableName: HondaTrackerStack.tableName,
      partitionKey: {
        name: "pk",
        type: aws_dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: "sk",
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  };

  private buildRestApi = () => {
    return new api.RestApi(this, REST_API_NAME, {
      restApiName: REST_API_NAME,
      deployOptions: {
        stageName: Stages.DEV,
      },
    });
  };
}
