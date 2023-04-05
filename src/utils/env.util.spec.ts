import * as chai from "chai";
import { getENVOrThrow } from "./env.util";

const { expect } = chai;

describe("env util", () => {
  describe("getEnvOrThrow", () => {
    it("should throw the default error when the input is wrong and 'toError' arg is not given", () => {
      const expectedError = `"process.env" parsing failed`;

      expect(() => getENVOrThrow({})).to.throw(expectedError);
    });

    it("should correctly decode the input with the given codec", () => {
      const env = {
        DEBUG: "",
        HOST: 'localhost',
        PORT: "3000",
        OPEN_WEATHER_API_KEY: "fake-api",
      };
      expect(getENVOrThrow(env)).to.be.like({
        ...env,
        PORT: 3000,
      });
    });
  });
});
