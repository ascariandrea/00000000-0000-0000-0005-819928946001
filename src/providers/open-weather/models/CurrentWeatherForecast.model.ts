import * as t from "io-ts";
import { Weather } from "./Weather";

export const CurrentWeatherForecast = t.strict(
  {
    coord: t.strict({ lon: t.number, lat: t.number }),
    weather: t.array(Weather),
    base: t.literal("stations"),
    main: t.strict({
      temp: t.number,
      feels_like: t.number,
      temp_min: t.number,
      temp_max: t.number,
      pressure: t.number,
      humidity: t.number,
    }),
    visibility: t.number,
    wind: t.strict({ speed: t.number, deg: t.number }),
    clouds: t.strict({ all: t.number }),
    dt: t.number,
    sys: t.strict({
      type: t.number,
      id: t.number,
      // this could be a union of literals
      country: t.string,
      sunrise: t.number,
      sunset: t.number,
    }),
    timezone: t.number,
    id: t.number,
    name: t.string,
    cod: t.number,
  },
  "CurrentWeatherForecast"
);

export type CurrentWeatherForecast = t.TypeOf<typeof CurrentWeatherForecast>;
