import * as t from "io-ts";

const Weather = t.strict({
  id: t.number,
  main: t.string,
  description: t.string,
  icon: t.string,
}, 'Weather');

type Weather = t.TypeOf<typeof Weather>;


export { Weather }