import * as chai from "chai";
import * as fc from "fast-check";
import { type Errors } from "io-ts";
import { WeatherArb } from "../../test/arbitraries/CurrentWeatherForecast.arb";
import { Weather } from "../providers/open-weather/models/Weather";
import { decodeOrThrow } from "./fp.util";

const { expect } = chai;

describe("fp util", () => {
  describe("decodeOrThrow", () => {
    it("should throw the default error when the input is wrong and 'toError' arg is not given", () => {
      const expectedError = `Invalid value undefined supplied to : Weather/id: number
Invalid value undefined supplied to : Weather/main: string
Invalid value undefined supplied to : Weather/description: string
Invalid value undefined supplied to : Weather/icon: string`;

      expect(() => decodeOrThrow(Weather)({})).to.throw(expectedError);
    });

    it("should throw a custom error when the input is wrong and the 'toError' arg is given", () => {
      const toError = (errs: Errors): string => {
        const keys = errs.flatMap((e) => {
          return e.context.map((c) => c.key);
        });
        return `Cannot decode fields: ${keys
          .filter((k) => k !== "")
          .map((k) => `"${k}"`)
          .join(", ")}.`;
      };

      expect(() => decodeOrThrow(Weather, toError)({})).to.throw(
        `Cannot decode fields: "id", "main", "description", "icon".`
      );

      expect(() => decodeOrThrow(Weather, toError)({
        description: 'valid description'
      })).to.throw(
        `Cannot decode fields: "id", "main", "icon".`
      );
    });

    it("should correctly decode the input with the given codec", () => {
      const [data] = fc.sample(WeatherArb, 1);

      expect(decodeOrThrow(Weather)(data)).to.be.like(data);
    });
  });
});
