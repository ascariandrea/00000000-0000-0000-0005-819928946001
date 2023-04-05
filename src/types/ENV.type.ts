import * as t from "io-ts";
import { NumberFromString } from 'io-ts-types/lib/NumberFromString';

export const ENV = t.strict(
  {
    DEBUG: t.string,
    HOST: t.string,
    PORT: NumberFromString,
    OPEN_WEATHER_API_KEY: t.string,
  },
  "ENV"
);

export type ENV = t.TypeOf<typeof ENV>;