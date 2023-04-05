import { CITIES } from "../../constants";
import { type Route } from "../../types/RouteContext.type";
import { decodeOrThrow } from "../../utils/fp.util";
import { GetCurrentWeatherForecastParams } from "./current-weather-forecast.params";

export const getCurrentWeatherForecastRoute: Route = ({
  logger,
  openWeather,
}) => {
  return async (req, res) => {
    const { city } = decodeOrThrow(GetCurrentWeatherForecastParams)({
      city: req.params.city.toLowerCase(),
    });

    const [lat, lon] = CITIES[city];
    logger.debug(
      `Get current weather forecast for %s (%d, %d)`,
      city,
      lat,
      lon
    );

    const forecast = await openWeather.getCurrentForecastForCity(lat, lon);

    return res.send({ data: forecast });
  };
};
