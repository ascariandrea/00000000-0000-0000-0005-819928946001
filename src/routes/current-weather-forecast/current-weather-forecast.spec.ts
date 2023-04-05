import { type AxiosInstance } from "axios";
import * as chai from "chai";
import * as like from "chai-like";
import * as fc from "fast-check";
import * as sinon from "sinon";
import { CurrentWeatherForecastArb } from "../../../test/arbitraries/CurrentWeatherForecast.arb";
import { GetLogger } from "../../logger";
import { GetOpenWeatherProvider } from "../../providers/open-weather/OpenWeather.provider";
import { type ENV } from '../../types/ENV.type';
import { type RouteContext } from "../../types/RouteContext.type";
import { getENVOrThrow } from '../../utils/env.util';
import { getCurrentWeatherForecastRoute } from "./current-weather-forecast.route";

chai.use(like);
const { expect } = chai;

describe("Current Weather Forecast", () => {
  let env: ENV;
  before((done) => {
    env = getENVOrThrow(process.env);
    done();
  });

  const logger = GetLogger("test");
    const get = sinon.fake();
    const getRouteContext = (get: AxiosInstance["get"]): RouteContext => ({
      env,
      logger,
      openWeather: GetOpenWeatherProvider({
        client: { get },
        logger,
        apiKey: "fake-key",
      }),
    });

  it("should receive a 400 when city is not allowed", async () => {
    const err = await getCurrentWeatherForecastRoute(getRouteContext(get))(
      { params: { city: "london" } } as any,
      { send: (r: any) => r } as any
    ).catch((e) => e);

    expect(err).to.be.instanceOf(Error);
    expect(err.message).to.eq(
      [
        'Invalid value "london" supplied to : GetcurrentWeatherForecastParams/city: ("milan" | "porto" | "beijing")/0: "milan"',
        'Invalid value "london" supplied to : GetcurrentWeatherForecastParams/city: ("milan" | "porto" | "beijing")/1: "porto"',
        'Invalid value "london" supplied to : GetcurrentWeatherForecastParams/city: ("milan" | "porto" | "beijing")/2: "beijing"',
      ].join("\n")
    );
  });

  it("should return the weather forecast", async () => {
    const [forecast] = fc.sample(CurrentWeatherForecastArb, 1);
    const get = sinon.fake.resolves({ data: forecast });

    const response = await getCurrentWeatherForecastRoute(getRouteContext(get))(
      { params: { city: "milan" } } as any,
      { send: (r: any) => r } as any
    );

    expect(response.data).to.be.like(forecast);
  });
});
