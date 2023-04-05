import { type AxiosInstance } from "axios";
import { expect } from "chai";
import * as fc from "fast-check";
import { CurrentWeatherForecastArb } from "../../../test/arbitraries/CurrentWeatherForecast.arb";
import { GetLogger } from "../../logger";
import { GetOpenWeatherProvider } from "../../providers/open-weather/OpenWeather.provider";
import { type ENV } from '../../types/ENV.type';
import { type RouteContext } from "../../types/RouteContext.type";
import { getENVOrThrow } from "../../utils/env.util";
import { getWeatherInfoRoute } from "./weather-info.route";

describe("Five Days Forecast", () => {
  let env: ENV;
  before((done) => {
    env = getENVOrThrow(process.env);
    done();
  });

  const logger = GetLogger("test");
  const getRouteContext = (get: AxiosInstance["get"]): RouteContext => ({
    env,
    logger,
    openWeather: GetOpenWeatherProvider({
      client: { get },
      logger,
      apiKey: "fake-key",
    }),
  });

  it("should return the weather info about selected cities", async () => {
    const forecasts = fc.sample(CurrentWeatherForecastArb, 3);
    let i = 0;
    const get = async (
      _url: any,
      _opts: any
    ): Promise<any> =>
      await new Promise<any>((resolve) => {
        const data = forecasts[i];
        i++;
        resolve({ data });
      });
    const response = await getWeatherInfoRoute(getRouteContext(get))(
      {} as any,
      { send: (r: any) => r } as any
    );

    expect(response.data).to.be.like({});
  });
});
