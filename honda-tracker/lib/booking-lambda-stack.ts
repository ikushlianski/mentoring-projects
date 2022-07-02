import { Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Lambdas } from "./types";

interface BookingLambdaStackProps extends StackProps {
  stage?: string;
  api: RestApi;
}

export class BookingLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(scope: Construct, id: string, props: BookingLambdaStackProps) {
    super(scope, id, props);

    this.initGetBookingLambda(props.api);
  }

  private initGetBookingLambda(restApi: RestApi | undefined) {
    const getBookingLambda = new NodejsFunction(this, "getBookingLambda", {
      runtime: Runtime.NODEJS_16_X,
      handler: "handler",
      entry: "./src/booking/get-booking.ts",
      functionName: "getBookingLambda",
    });

    this.lambdas.set("get-booking", getBookingLambda);

    const getBookingLambdaIntegration = new apiGateway.LambdaIntegration(
      getBookingLambda
    );

    if (restApi) {
      const bookingsPath = restApi.root
        .addResource("bookings")
        .addResource("{id}");

      bookingsPath.addMethod("GET", getBookingLambdaIntegration);
    }

    return getBookingLambda;
  }
}
