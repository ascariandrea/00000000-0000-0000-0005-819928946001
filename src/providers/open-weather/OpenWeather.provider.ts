import { type AxiosInstance } from "axios";
import { type Logger } from "../../logger";
import { decodeOrThrow } from "../../utils/fp.util";
import { CurrentWeatherForecast } from "./models/CurrentWeatherForecast.model";
import { FiveDaysForecast } from "./models/FiveDaysForecast.model";

/**
 * Open Weather API Provider
 */
export const OPEN_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5`;

export interface OpenWeatherProvider {
  /**
   * WeatherForecast by latitude and longitude
   */
  getCurrentForecastForCity: (
    lat: number,
    lng: number
  ) => Promise<CurrentWeatherForecast>;
  /**
   * FiveDaysForecast by latitude and longitude
   */
  getFiveDaysForecastForCity: (
    lat: number,
    lng: number
  ) => Promise<FiveDaysForecast>;
}

/**
 * Open Weather Provider Options
 *
 */
interface OpenWeatherProviderOpts {
  logger: Logger;
  apiKey: string;
  client: {
    get: AxiosInstance["get"];
  };
}

/**
 * Export the function to create an OpenWeatherProvider 
 */

export const GetOpenWeatherProvider = ({
  logger,
  apiKey,
  client,
}: OpenWeatherProviderOpts): OpenWeatherProvider => {
  logger.debug("new OpenWeatherProvider");
  return {
    async getCurrentForecastForCity(lat, lon) {
      const url = `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      logger.debug(`GET %s`, url);
      const response = await client.get(url);
      return decodeOrThrow(CurrentWeatherForecast)(response.data);
    },
    async getFiveDaysForecastForCity(lat, lon) {
      const url = `/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      logger.debug(`GET %s`, url);
      const response = await client.get(url);

      return decodeOrThrow(FiveDaysForecast)(response.data);
    },
  };
};
