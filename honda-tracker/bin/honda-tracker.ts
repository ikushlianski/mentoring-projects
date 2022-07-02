#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { BookingLambdaStack } from "../lib/booking-lambda-stack";
import { HondaTrackerStack } from "../lib/honda-tracker-stack";
import { RestApiStack } from "../lib/rest-api-stack";
import { UserLambdaStack } from "../lib/user-lambda-stack";
import { Stages } from "../src/constants";

const app = new cdk.App();
const stage = process.env.NODE_ENV as Stages;

if (!stage) {
  throw Error("No stage found");
}

console.log(`Using stage "${stage}"`);

const restApiStack = new RestApiStack(app, "RestApiStack");

const bookingLambdasStack = new BookingLambdaStack(app, "bookingLambdaStack", {
  stage,
  api: restApiStack.restApi,
});

const userLambdasStack = new UserLambdaStack(app, "userLambdaStack", {
  stage,
  api: restApiStack.restApi,
});

const hondaTrackerStack = new HondaTrackerStack(app, "HondaTrackerStack", {
  stage,
  api: restApiStack.restApi,
  bookingLambdas: bookingLambdasStack.lambdas,
  userLambdas: userLambdasStack.lambdas,
});
