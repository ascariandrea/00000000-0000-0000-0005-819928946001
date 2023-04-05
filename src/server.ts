/* istanbul ignore file */

import * as express from "express";
import { getCurrentWeatherForecastRoute } from "./routes/current-weather-forecast/current-weather-forecast.route";
import { getFiveDaysForecastRoute } from "./routes/five-days-forecast/five-days-forecast.route";
import { getHealthCheckRoute } from './routes/healthcheck/healthcheck.route';
import { getWeatherInfoRoute } from "./routes/weather-info/weather-info.route";
import { type RouteContext } from "./types/RouteContext.type";

interface ServerContext extends RouteContext {}

export const GetServer = (ctx: ServerContext): express.Application => {
  ctx.logger.debug("Creating express app with env %O", ctx.env);
  const app = express();

  const router = express.Router();

  /* eslint-disable @typescript-eslint/no-misused-promises */
  router.get("/healthcheck", getHealthCheckRoute(ctx));
  router.get("/weather/:city", getCurrentWeatherForecastRoute(ctx));
  router.get("/weather-info", getWeatherInfoRoute(ctx));
  router.get("/forecast-all", getFiveDaysForecastRoute(ctx));
  /* eslint-enable @typescript-eslint/no-misused-promises */

  app.use(router);

  return app;
};
