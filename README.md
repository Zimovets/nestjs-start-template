## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Run Postgres
```bash
$  docker run --name postgres -e POSTGRES_PASSWORD=1111 -e POSTGRES_DB=saas_marketing_platform -p 5432:5432 -d postgres
