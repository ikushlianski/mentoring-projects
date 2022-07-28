# Honda Tracker Backend

This project is a simple app to track our shared family car, Honda. The car is used by me, my wife and my father, all at different days and time.

My wife provides a frontend as her portfolio project, and I'm doing backend. 

I started this project to practice hexagonal architecture, AWS CDK and Cucumber/Gherkin testing.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template

## Database
DynamoDB is used for this project, a single-table design is attempted.

### Seed data
Seed data is located in unversioned files, as it contains secrets like passwords for initial users.

After your stack is deployed, ensure you have these seeds in `./src/seeds` and run a similar following command to populate the DB:
```
aws dynamodb batch-write-item --request-items file://src/db/seeds/defaultData_dev.json --profile <AWS profile for honda-tracker project>
```

## Auth
[//]: # (TODO add auth implementation docs)
Auth is very simple, no registration required, as this is a family-only app. Users are assigned their usernames and passwords ahead of time. This data is in a non-VCS secret json file loaded into the DB (might need to put it into SSM when setting up a deployment pipeline).

## Testing

### Local Lambda testing
For local testing of lambdas, use AWS SAM CLI. For example, to run a getBookingLambda, use this code:

```
NODE_ENV=dev cdk synth --no-staging \
&& sam local invoke getUserLambda \
-e ./src/user/getUser.event.json \
-t ./cdk.out/userLambdaStack.template.json
```

### Unit tests
Jest is used as a testing framework.

To test a particular file run `npm run test:watch -- -- <your-file-regexp>`.

The double `--` is because of how `concurrently` tool passes arguments and because of how `npm` scripts work.

To run tests in non-dev mode, e.g. as part of your pipeline, run `npm run test`. It will build the project and run all Jest tests.

### Integration tests
Integration testing covers the backend API. It is written in Gherkin using Cucumber.

To run integration tests, do `npm run integration`
