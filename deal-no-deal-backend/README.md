# Deal or Not Deal Game

Backend for Deal or Not Deal Game. Uses MongoDB, AWS Cognito and Nest.js.

## Installation

```bash
$ yarn install
```

This will install all dependencies and set up pre-commit hooks for Deal No Deal project automatically.

## Running the app
Make sure you have a valid `.env` file in your root directory.

The app runs in Docker containers. To start the container, do

```bash
yarn docker:start
```

To stop the app correctly, hit Ctrl+C and then 

```bash
yarn docker:stop
```

## User registration
Authentication is done via AWS Cognito.

Ensure you have `aws` CLI installed and configured (region is `eu-west-1`).

To test user registration multiple times you will need to remove the created user. Use the following command to quickly remove the user from your Cognito user pool.

```
aws cognito-idp admin-delete-user --user-pool-id <user-pool-id> --username <your-username> --profile <your-aws-cli-profile>
```


## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
