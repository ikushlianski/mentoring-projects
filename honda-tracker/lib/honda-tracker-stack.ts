import { aws_dynamodb, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { ServicePrincipal } from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import { TABLE_NAME } from "../src/constants";
import { Lambdas } from "./types";

interface HondaStackProps extends StackProps {
  stage?: string;
  api: RestApi;
  bookingLambdas: Lambdas;
  userLambdas: Lambdas;
}

export class HondaTrackerStack extends Stack {
  tableName: string;
  table: Table;
  bookingLambdas: Lambdas;
  userLambdas: Lambdas;

  constructor(scope: Construct, id: string, props: HondaStackProps) {
    super(scope, id, props);

    this.tableName = `${TABLE_NAME}_${props.stage}`;
    this.table = this.buildTable();

    this.bookingLambdas = props.bookingLambdas;
    this.userLambdas = props.userLambdas;

    this.setUpLambdaPermissions();
  }

  private buildTable = () => {
    return new aws_dynamodb.Table(this, this.tableName, {
      tableName: this.tableName,
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

  private setUpLambdaPermissions() {
    // todo group together all lambda groups like bookingLambda, userLambda etc. and run this loop once over all of them
    for (const [, lambda] of this.bookingLambdas) {
      // grant DynamoDB permissions
      this.table.grantReadWriteData(lambda);

      // grant API Gateway invoke permissions
      lambda.grantInvoke(new ServicePrincipal("apigateway.amazonaws.com"));
    }

    for (const [, lambda] of this.userLambdas) {
      // grant DynamoDB permissions
      this.table.grantReadWriteData(lambda);

      // grant API Gateway invoke permissions
      lambda.grantInvoke(new ServicePrincipal("apigateway.amazonaws.com"));
    }
  }
}
