# Open Weather Forecast API Service

A simple _express_ HTTP server written in TypeScript for Weather Forecast of 3 selected cities:

- Milan
- Porto
- Beijing

## Requirements

Ensure you have the following modules installed in your machine

- node >= 16
- yarn >= 3.5
- docker >= 23
- docker-compose >= 1.29

## Install

After you have cloned the repo, you need to install the dependencies with `yarn`.

The [latest version](https://yarnpkg.com/getting-started/install#nodejs-1617-or-186) of Yarn is committed in the repo `.yarn/releases/` folder, to enable it run:

```sh
yarn set version stable

➤ YN0000: Retrieving https://repo.yarnpkg.com/3.5.0/packages/yarnpkg-cli/bin/yarn.js
➤ YN0000: Saving the new release in .yarn/releases/yarn-3.5.0.cjs
➤ YN0000: Done in 0s 557ms
```

Then to install the dependencies 
```sh
yarn install
```

## Development

The development command start the server in _watch_ mode with `ts-node-dev`

```sh
yarn dev
```

The env variables are loaded during the server bootstrap with _dotenv_ from the default `.env` file. The dotenv config path can be configured with the `DOTENV_CONFIG` env variable.

As additional step, _dotenv_ loads also an `.env.local` file that can be used to setup sensible data since its ignored by git (the `OPEN_WEATHER_API_KEY` can be set here).

## Test

The Spec test are run with _mocha_ and the configuration can be found in [.mocharc.js](./.mocharc.js)

```sh
yarn test           # single run of spec test with mocha
yarn test:watch     # watch for changes in ./src/**/*.ts
yarn test:coverage  # output test coverage with nyc
```

## Build

The output build is performed with TypeScript and a proper `tsconfig.build.json` configuration. It can be run with:

```sh
yarn build
```

## Deployment

The service has its own _docker_ image defined and a _docker-compose_ configuration to easily run the service.

You can build the image with

```sh
docker-compose build
```

And then start the service with

```sh
docker-compose up
api    |   mamac:server:debug Creating express app with env {
api    |   mamac:server:debug   DEBUG: 'mamac:*',
api    |   mamac:server:debug   PORT: 3005,
api    |   mamac:server:debug   OPEN_WEATHER_API_KEY: '**********',
api    |   mamac:server:debug   HOST: '0.0.0.0'
api    |   mamac:server:debug } +0ms
api    |   mamac:server:debug Check server is running at http://0.0.0.0:3005/healthcheck +5ms
api    |   mamac:server:debug Added GET current weather route +0ms
api    |   mamac:server:debug Server listening on http://0.0.0.0:3005/healthcheck +6ms

```

## Scripts

Do you want to run all the commands at once?

```sh
./scripts/test-all.sh
```
