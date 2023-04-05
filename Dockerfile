FROM node:18-alpine as build

WORKDIR /app

COPY .yarn/plugins .yarn/plugins
COPY .yarn/releases .yarn/releases

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .
COPY tsconfig.json .
COPY tsconfig.build.json .
COPY ./src ./src

RUN yarn install

RUN yarn build

FROM node:18-alpine as production

WORKDIR /app

COPY package.json /app/package.json
COPY .yarnrc.yml /app/.yarnrc.yml
COPY --from=build /app/.yarn /app/.yarn
COPY --from=build /app/node_modules /app/node_modules

# API build output
COPY --from=build /app/lib /app/lib

RUN yarn install
RUN yarn prod-install /app/lib

RUN rm -rf /app/.yarn/cache /app/node_modules/.cache

CMD ["yarn", "start"]