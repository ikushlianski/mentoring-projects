#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { HondaTrackerStack } from "../lib/honda-tracker-stack";

const app = new cdk.App();
const stage = process.env.NODE_ENV;

console.log(`Using stage "${stage}"`);

const hondaTrackerStack = new HondaTrackerStack(app, "HondaTrackerStack", {
  stage,
});
