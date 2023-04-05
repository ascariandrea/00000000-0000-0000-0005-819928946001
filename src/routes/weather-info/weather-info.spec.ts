import { type AxiosInstance } from "axios";
import { expect } from "chai";
import * as fc from "fast-check";
import { CurrentWeatherForecastArb } from "../../../test/arbitraries/CurrentWeatherForecast.arb";
import { GetLogger } from "../../logger";
import { GetOpenWeatherProvider } from "../../providers/open-weather/OpenWeather.provider";
import { type ENV } from "../../types/ENV.type";
import { type RouteContext } from "../../types/RouteContext.type";
import { getENVOrThrow } from "../../utils/env.util";
import { getWeatherInfoRoute } from "./weather-info.route";

describe("Weather Info", () => {
  let env: ENV;
  before((done) => {
    env = getENVOrThrow(process.env);
    done();
  });

  const logger = GetLogger("mamac-test");
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

    forecasts[0].main.temp = 0;
    forecasts[0].main.temp_min = 0;
    forecasts[0].main.temp_max =
      Math.max(...forecasts.map((f) => f.main.temp_max)) + 1000;

    forecasts[1].main.humidity =
      Math.max(...forecasts.map((f) => f.main.humidity)) + 1000;
    forecasts[1].main.temp = 0;
    forecasts[1].main.temp_min = 10;
    forecasts[1].main.temp_max = 20;

    forecasts[2].main.temp = 140;
    forecasts[2].main.temp_min = 100;
    forecasts[2].main.temp_max = 200;

    let i = 0;
    const get = async (_url: any, _opts: any): Promise<any> =>
      await new Promise<any>((resolve) => {
        const data = forecasts[i];
        i++;
        resolve({ data });
      });
    const response = await getWeatherInfoRoute(getRouteContext(get))(
      {} as any,
      { send: (r: any) => r } as any
    );

    expect(response.data).to.be.eqls({
      highestTemp: {
        city: forecasts[0].name,
        value: forecasts[0].main.temp_max,
      },
      highestHumidity: {
        city: forecasts[1].name,
        value: forecasts[1].main.humidity,
      },
      averageTemps: [
        {
          city: forecasts[0].name,
          value: parseInt((forecasts[0].main.temp_max / 3).toFixed(2), 10),
        },
        {
          city: forecasts[1].name,
          value: 10,
        },
        {
          city: forecasts[2].name,
          value: 146.67,
        },
      ],
    });
  });
});
