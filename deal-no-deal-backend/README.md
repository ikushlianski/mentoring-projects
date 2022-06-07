# Deal or Not Deal Game

Backend for Deal or Not Deal Game. Uses MongoDB, AWS Cognito and Nest.js.

## Installation

```bash
$ yarn install
```

This will install all dependencies and set up pre-commit hooks for Deal No Deal project automatically.

## Running the backend app
Make sure you have a valid `.env` file in your root directory.

The app runs in Docker containers. 

1. If you are going to consume the backend: 
- set `DOCKER_ENV=prod` in your `.env` file
- run the script

```bash
yarn docker:start-prod
```

2. If you are going to develop the backend:

- set `DOCKER_ENV=dev` in your `.env` file
- run the script

```bash
yarn docker:start
```

The backend app will be running on `http://localhost:3000`

To stop the app correctly, hit Ctrl+C and then

```bash
yarn docker:stop
```


## Infrastructure

### Tech
Infrastructure is created using Terraform. The app uses MongoDB as a storage and Cognito as an auth mechanism.

### Environment variables
Variables are located in `.env` file. See `.env.example` as a starting point.

Nest.js supports variable expansion, so try using them as much as possible to be DRY.

For Terraform the variables are transformed into `export` bash statements with `yarn loadenv` script. It produces a copy of `.env` file called `.env.exported`. 

### Seed data
A test user is created upon app start (see `.env` file - `TF_VAR_COGNITO_DEFAULT_USER_NAME`).

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
