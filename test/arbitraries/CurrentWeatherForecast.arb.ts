import * as fc from "fast-check";
import { CurrentWeatherForecast } from "../../src/providers/open-weather/models/CurrentWeatherForecast.model";
import { Weather } from "../../src/providers/open-weather/models/Weather";

export const WeatherArb: fc.Arbitrary<Weather> = fc.record({
  id: fc.nat(),
  main: fc.string(),
  description: fc.lorem(),
  icon: fc.string(),
});

export const CurrentWeatherForecastArb: fc.Arbitrary<CurrentWeatherForecast> =
  fc.record({
    id: fc.integer(),
    name: fc.string(),
    cod: fc.integer(),
    dt: fc.integer(),
    timezone: fc.integer(),
    coord: fc.record({ lat: fc.float(), lon: fc.float() }),
    weather: fc.array(WeatherArb),
    base: fc.constant("stations"),
    main: fc.record({
      temp: fc.integer(),
      feels_like: fc.integer(),
      temp_min: fc.integer(),
      temp_max: fc.integer(),
      pressure: fc.integer(),
      humidity: fc.integer(),
    }),
    visibility: fc.integer(),
    wind: fc.record({
      speed: fc.nat(),
      deg: fc.nat(),
    }),
    clouds: fc.record({
      all: fc.integer(),
    }),
    sys: fc.record({
      type: fc.integer(),
      id: fc.integer(),
      country: fc.string(),
      sunrise: fc.integer(),
      sunset: fc.integer(),
    }),
  });
