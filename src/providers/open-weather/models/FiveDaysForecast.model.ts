import * as t from "io-ts";
import { CurrentWeatherForecast } from "./CurrentWeatherForecast.model";

export const FiveDaysForecast = t.strict(
  {
    cod: t.number,
    message: t.number,
    cnt: t.number,
    list: t.array(CurrentWeatherForecast),
    city: t.strict({
      id: t.number,
      name: t.string,
      coord: t.strict({ lon: t.number, lat: t.number }),
      country: t.string,
      population: t.number,
      timezone: t.number,
      sunrise: t.number,
      sunset: t.number,
    }),
  },
  "FiveDaysForecast"
);

export type FiveDaysForecast = t.TypeOf<typeof FiveDaysForecast>;
