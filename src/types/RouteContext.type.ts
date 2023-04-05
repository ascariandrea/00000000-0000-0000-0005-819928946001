import type * as Express from "express-serve-static-core";
import { type Logger } from "../logger";
import { type OpenWeatherProvider } from "../providers/open-weather/OpenWeather.provider";
import { type ENV } from "./ENV.type";

export interface RouteContext {
  env: ENV;
  logger: Logger;
  openWeather: OpenWeatherProvider;
}

export type RouteHandler = (
  req: Express.Request,
  res: Express.Response
) => Promise<any>;

export type Route = (ctx: RouteContext) => RouteHandler;