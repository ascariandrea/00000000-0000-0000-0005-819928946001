import { type AxiosInstance } from "axios";
import { type Logger } from "../../logger";
import { decodeOrThrow } from "../../utils/fp.util";
import { CurrentWeatherForecast } from "./models/CurrentWeatherForecast.model";
import { FiveDaysForecast } from "./models/FiveDaysForecast.model";

export const OPEN_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5`;

export interface OpenWeatherProvider {
  getCurrentForecastForCity: (
    lat: number,
    lng: number
  ) => Promise<CurrentWeatherForecast>;
  getFiveDaysForecastForCity: (
    lat: number,
    lng: number
  ) => Promise<FiveDaysForecast>;
}

interface OpenWeatherProviderOpts {
  logger: Logger;
  apiKey: string;
  client: {
    get: AxiosInstance["get"];
  };
}

export const GetOpenWeatherProvider = ({
  logger,
  apiKey,
  client,
}: OpenWeatherProviderOpts): OpenWeatherProvider => {
  return {
    async getCurrentForecastForCity(lat, lon) {
      const response = await client.get(
        `/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      return decodeOrThrow(CurrentWeatherForecast)(response.data);
    },
    async getFiveDaysForecastForCity(lat, lon) {
      const response = await client.get(
        `/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      return decodeOrThrow(FiveDaysForecast)(response.data);
    },
  };
};
