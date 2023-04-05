import { ENV } from "../types/ENV.type";
import { decodeOrThrow } from "./fp.util";

export const getENVOrThrow = (env: any): ENV => {
  return decodeOrThrow(ENV, () => `"process.env" parsing failed`)(env);
};
