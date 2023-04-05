import { CITIES } from "../../constants";
import { type Route } from "../../types/RouteContext.type";
import { decodeOrThrow } from "../../utils/fp.util";
import { GetCurrentWeatherForecastParams } from "../current-weather-forecast/current-weather-forecast.params";

interface FiveDaysForecastResult {
  pressure: number[];
  humidity: number[];
  temps: number[];
  temps_max: number[];
  temps_min: number[];
}

const emptyFiveDaysForecastResult: FiveDaysForecastResult = {
  pressure: [],
  humidity: [],
  temps: [],
  temps_max: [],
  temps_min: [],
};

export const getFiveDaysForecastRoute: Route =
  (ctx) => async (req, res) => {
    const { city } = decodeOrThrow(GetCurrentWeatherForecastParams)(req.params);
    const [lat, lon] = CITIES[city];
    const forecast = await ctx.openWeather.getFiveDaysForecastForCity(lat, lon);

    ctx.logger.debug("Forecast for city %s: %O", city, forecast);

    const temps = forecast.list.reduce((acc, l) => {
      return {
        temps: acc.temps.concat(l.main.temp),
        temps_min: acc.temps_min.concat(l.main.temp_min),
        temps_max: acc.temps_min.concat(l.main.temp_max),
        pressure: acc.pressure.concat(l.main.pressure),
        humidity: acc.humidity.concat(l.main.humidity),
      };
    }, emptyFiveDaysForecastResult);

    return res.send({ data: temps });
  };
