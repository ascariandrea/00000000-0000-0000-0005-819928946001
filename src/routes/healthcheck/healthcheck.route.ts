import { type Route } from "../../types/RouteContext.type";

export const getHealthCheckRoute: Route = (ctx) => {
  ctx.logger.debug(
    `Check server is running at http://%s:%d/healthcheck`,
    ctx.env.HOST,
    ctx.env.PORT
  );

  return async (req, res) => {
    return res.send({
      data: {
        status: "success",
      },
    });
  };
};
