# Deal or Not Deal Game

Backend for Deal or Not Deal Game. Uses MongoDB, AWS Cognito and Nest.js.

## Installation

```bash
$ yarn install
```

## Running the app

The app is launched in Docker containers. Please run

```bash
yarn docker:start
```

To stop the app correctly, hit Ctrl+C and then 

```bash
yarn docker:stop
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
