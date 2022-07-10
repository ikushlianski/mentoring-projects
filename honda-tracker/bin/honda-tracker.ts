#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AuthLambdaStack } from '../lib/auth-lambda-stack';
import { BookingLambdaStack } from '../lib/booking-lambda-stack';
import { HondaTrackerStack } from '../lib/honda-tracker-stack';
import { HttpApiStack } from '../lib/rest-api-stack';
import { UserLambdaStack } from '../lib/user-lambda-stack';
import { Stages } from '../src/constants';

const app = new cdk.App();
const stage = process.env.NODE_ENV as Stages;

if (!stage) {
  throw Error('No stage found');
}

console.log(`Using stage "${stage}"`);

const { httpApi } = new HttpApiStack(app, `RestApiStack-${stage}`, {
  stage,
});

const bookingLambdasStack = new BookingLambdaStack(
  app,
  `bookingLambdaStack-${stage}`,
  {
    stage,
    api: httpApi,
  },
);

const authLambdasStack = new AuthLambdaStack(
  app,
  `authLambdaStack-${stage}`,
  {
    stage,
    api: httpApi,
  },
);

const userLambdasStack = new UserLambdaStack(
  app,
  `userLambdaStack-${stage}`,
  {
    stage,
    api: httpApi,
  },
);

const hondaTrackerStack = new HondaTrackerStack(
  app,
  `HondaTrackerStack-${stage}`,
  {
    stage,
    api: httpApi,
    bookingLambdas: bookingLambdasStack.lambdas,
    userLambdas: userLambdasStack.lambdas,
    authLambdas: authLambdasStack.lambdas,
  },
);
