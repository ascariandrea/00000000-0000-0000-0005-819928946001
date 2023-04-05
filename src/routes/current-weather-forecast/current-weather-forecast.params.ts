import * as t from "io-ts";

const Milan = t.literal("milan");
const Porto = t.literal("porto");
const Beijing = t.literal("beijing");

export const GetCurrentWeatherForecastParams = t.strict(
  {
    city: t.union([Milan, Porto, Beijing]),
  },
  "GetcurrentWeatherForecastParams"
);
