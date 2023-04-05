import { CITIES } from "../../constants";
import { type Route } from "../../types/RouteContext.type";

interface InfoResult {
  city: string;
  value: number;
}

interface WeatherInfoResult {
  highestHumidity: InfoResult;
  highestTemp: InfoResult;
  averageTemps: InfoResult[];
}

const emptyWeatherInfo: WeatherInfoResult = {
  highestTemp: { city: "", value: 0 },
  highestHumidity: { city: "", value: 0 },
  averageTemps: [],
};

export const getWeatherInfoRoute: Route = (ctx) => async (_, res) => {
  const cities = Object.values(CITIES);
  const forecasts = await Promise.all([
    ...cities.map(
      async ([lat, lon]) =>
        await ctx.openWeather.getCurrentForecastForCity(lat, lon)
    ),
  ]);

  ctx.logger.debug("Forecasts %O", forecasts);

  const result = forecasts.reduce((acc, f) => {
    return {
      ...acc,
      highestTemp:
        f.main.temp_max >= acc.highestTemp.value
          ? { city: f.name, value: f.main.temp_max }
          : acc.highestTemp,
      highestHumidity:
        f.main.humidity >= acc.highestHumidity.value
          ? { city: f.name, value: f.main.humidity }
          : acc.highestHumidity,
      averageTemps: acc.averageTemps.concat({
        city: f.name,
        value: Math.round((f.main.temp_max - f.main.temp_min) * 100) / 100,
      }),
    };
  }, emptyWeatherInfo);

  return res.send({ data: result });
};
