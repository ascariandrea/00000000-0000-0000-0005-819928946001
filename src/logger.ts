import D from "debug";

export interface Logger {
  info: D.Debugger;
  debug: D.Debugger;
  warn: D.Debugger;
  error: D.Debugger;
}

export const GetLogger = (n: string): Logger => {
  const debug = D(n);

  return {
    info: debug.extend("info"),
    debug: debug.extend("debug"),
    warn: debug.extend("warn"),
    error: debug.extend("error"),
  };
};
