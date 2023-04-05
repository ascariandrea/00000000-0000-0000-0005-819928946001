/* istanbul ignore file */

import * as path from "path";
import axios from "axios";
import D from "debug";
import * as dotenv from "dotenv";
import { GetLogger } from "./logger";
import {
  GetOpenWeatherProvider,
  OPEN_WEATHER_API_URL,
} from "./providers/open-weather/OpenWeather.provider";
import { GetServer } from "./server";
import { getENVOrThrow } from "./utils/env.util";

/**
 * Load env file from DOTENV_CONFIG env variable
 */
dotenv.config({
  path: path.resolve(process.cwd(), process.env.DOTENV_CONFIG ?? ".env"),
});

/**
 * Patch env with local env file
 */
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

/**
 * Bootstrap the server, running the following tasks
 * - load and decode env
 * - set logger enabled namespaces
 * - load server context with needed providers (logger module and Open Weather API Client)
 * - create the server routes
 * - bind server port
 * - enjoy :)
 */
const run = async (): Promise<void> => {
  const serverLogger = GetLogger("mamac:server");
  const env = getENVOrThrow(process.env);

  // enable debug namespaces defined in process.env
  D.enable(env.DEBUG);

  const ctx = {
    env,
    logger: serverLogger,
    openWeather: GetOpenWeatherProvider({
      logger: serverLogger,
      apiKey: env.OPEN_WEATHER_API_KEY,
      client: axios.create({
        baseURL: OPEN_WEATHER_API_URL,
      }),
    }),
  };

  const app = GetServer(ctx);

  const server = app.listen(env.PORT, env.HOST, () => {
    serverLogger.debug("Server listening on http://%s:%d", env.HOST, env.PORT);
  });

  // eslint-disable-next-line no-console
  server.on("error", console.error);
};

// eslint-disable-next-line no-console
run().catch(console.error);
