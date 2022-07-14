import { HttpApi } from '@aws-cdk/aws-apigatewayv2-alpha';
import {
  aws_dynamodb,
  RemovalPolicy,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import { Stages, TABLE_NAME } from '../src/constants';
import { Lambdas } from './types';
import { mergeLambdas } from './utils';

interface HondaStackProps extends StackProps {
  stage: Stages;
  api: HttpApi;
  bookingLambdas: Lambdas;
  userLambdas: Lambdas;
  authLambdas: Lambdas;
}

export class HondaTrackerStack extends Stack {
  stage: Stages;
  tableName: string;
  table: Table;
  bookingLambdas: Lambdas;
  userLambdas: Lambdas;
  authLambdas: Lambdas;

  constructor(scope: Construct, id: string, props: HondaStackProps) {
    super(scope, id, props);

    this.stage = props.stage;

    this.tableName = `${TABLE_NAME}_${props.stage}`;
    this.table = this.buildTable();

    this.bookingLambdas = props.bookingLambdas;
    this.userLambdas = props.userLambdas;
    this.authLambdas = props.authLambdas;

    this.setUpLambdaPermissions();
  }

  private buildTable = () => {
    return new aws_dynamodb.Table(this, this.tableName, {
      tableName: this.tableName,
      partitionKey: {
        name: 'pk',
        type: aws_dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: aws_dynamodb.AttributeType.STRING,
      },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy:
        this.stage === Stages.PROD
          ? RemovalPolicy.RETAIN
          : RemovalPolicy.DESTROY,
    });
  };

  private setUpLambdaPermissions() {
    const lambdas: Lambdas = mergeLambdas([
      this.authLambdas,
      this.bookingLambdas,
      this.userLambdas,
    ]);

    for (const [, lambda] of lambdas) {
      // grant DynamoDB permissions
      this.table.grantReadWriteData(lambda);

      // grant API Gateway invoke permissions
      lambda.grantInvoke(new ServicePrincipal('apigateway.amazonaws.com'));
    }
  }
}
