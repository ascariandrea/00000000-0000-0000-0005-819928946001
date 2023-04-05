import { type AxiosInstance } from "axios";
import * as chai from "chai";
import * as like from "chai-like";
import * as fc from "fast-check";
import * as sinon from "sinon";
import { FiveDaysForecastArb } from "../../../test/arbitraries/FiveDaysForecast.arb";
import { GetLogger } from "../../logger";
import { GetOpenWeatherProvider } from "../../providers/open-weather/OpenWeather.provider";
import { type ENV } from '../../types/ENV.type';
import { type RouteContext } from "../../types/RouteContext.type";
import { getENVOrThrow } from "../../utils/env.util";
import { getFiveDaysForecastRoute } from "./five-days-forecast.route";

chai.use(like);
const { expect } = chai;

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

  it("should receive a 400 when city is not allowed", async () => {
    const err = await getFiveDaysForecastRoute(getRouteContext(sinon.fake()))(
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

  it("should return the five days forecast", async () => {
    const [forecast] = fc.sample(FiveDaysForecastArb, 1);

    const get = sinon.fake.resolves({ data: forecast });

    const response = await getFiveDaysForecastRoute(getRouteContext(get))(
      { params: { city: "milan" } } as any,
      { send: (r: any) => r } as any
    );

    expect(response.data).to.be.like({
      temps: forecast.list.flatMap((l) => l.main.temp),
      temps_min: forecast.list.flatMap((l) => l.main.temp_min),
      // temps_max: forecast.list.flatMap((l) => l.main.temp_max),
      humidity: forecast.list.flatMap((l) => l.main.humidity),
      pressure: forecast.list.flatMap((l) => l.main.pressure),
    });
  });
});
