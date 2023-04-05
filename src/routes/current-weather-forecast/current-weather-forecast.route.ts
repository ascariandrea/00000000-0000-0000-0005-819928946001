import { CITIES } from "../../constants";
import { type Route } from "../../types/RouteContext.type";
import { decodeOrThrow } from "../../utils/fp.util";
import { GetCurrentWeatherForecastParams } from "./current-weather-forecast.params";

export const getCurrentWeatherForecastRoute: Route = (ctx) => {
  ctx.logger.debug("Added GET current weather route");
  return async (req, res) => {
    const { city } = decodeOrThrow(GetCurrentWeatherForecastParams)({
      city: req.params.city.toLowerCase(),
    });
    const [lat, lon] = CITIES[city];
    const forecast = await ctx.openWeather.getCurrentForecastForCity(lat, lon);

    ctx.logger.debug("Forecast for %s: %O", city, forecast);

    return res.send({ data: forecast });
  };
};
