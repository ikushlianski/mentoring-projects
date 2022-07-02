import { Stack, StackProps } from "aws-cdk-lib";
import { RestApi } from "aws-cdk-lib/aws-apigateway";
import * as api from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { Stages } from "../src/constants";
import { Lambdas } from "./types";

interface UserLambdaStackProps extends StackProps {
  stage: Stages;
  api: RestApi;
}

export class UserLambdaStack extends Stack {
  lambdas: Lambdas = new Map();

  constructor(scope: Construct, id: string, props: UserLambdaStackProps) {
    super(scope, id, props);

    this.initGetUserLambda(props.api, props.stage);
  }

  private initGetUserLambda(restApi: RestApi, stage: Stages) {
    const getUserLambda = new NodejsFunction(this, "getUserLambda", {
      runtime: Runtime.NODEJS_16_X,
      handler: "handler",
      entry: "./src/user/get-user.ts",
      functionName: "getUserLambda",
      environment: {
        stage,
      },
    });

    this.lambdas.set("get-user", getUserLambda);

    const getUserLambdaIntegration = new api.LambdaIntegration(getUserLambda);

    if (restApi) {
      const usersPath = restApi.root.addResource("users").addResource("{id}");

      usersPath.addMethod("GET", getUserLambdaIntegration);
    }

    return getUserLambda;
  }
}
