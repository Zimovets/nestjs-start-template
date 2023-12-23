## Technology stack
 - nestjs
 - microORM
 - postgres

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

## Run Postgres in Docker

```bash

$  docker run --name postgres -e POSTGRES_PASSWORD=yourPassword -e POSTGRES_DB=yourDBname -p 5432:5432 -d postgres

```
## Handle migrations

```bash

# create migration
$ npm run migration:create

# run migration
$ npm run migration:up

# rollback migration
$ npm run migration:up

```