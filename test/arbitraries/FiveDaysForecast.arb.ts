import * as fc from "fast-check";
import { CurrentWeatherForecastArb } from "./CurrentWeatherForecast.arb";
import { FiveDaysForecast } from "../../src/providers/open-weather/models/FiveDaysForecast.model";

export const FiveDaysForecastArb: fc.Arbitrary<FiveDaysForecast> = fc.record({
  cod: fc.integer(),
  message: fc.integer(),
  cnt: fc.integer(),
  list: fc.array(CurrentWeatherForecastArb, { minLength: 5 }),
  city: fc.record({
    type: fc.integer(),
    id: fc.integer(),
    name: fc.string(),
    coord: fc.record({ lat: fc.float(), lon: fc.float() }),
    country: fc.string(),
    sunrise: fc.integer(),
    sunset: fc.integer(),
    timezone: fc.nat(),
    population: fc.integer(),
  }),
});
