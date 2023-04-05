#! /bin/sh


rm -rf node_modules lib coverage .nyc_output
# use latest version of yarn

yarn set version latest

# install
yarn

# build
yarn build

# test
yarn test:coverage

# build docker image
docker-compose build --force-rm

# run docker container in detach mode
docker-compose up -d

sleep 5

docker-compose logs api

response=$(curl http://0.0.0.0:3005/healthcheck)
echo "Health Check response: $response"
status=$(echo $response | node -e "console.log( JSON.parse(require('fs').readFileSync(0) ).data.status )")
if [ $status != 'success' ]; then
    echo "Health check failed :("
    return;
fi;
docker-compose down
