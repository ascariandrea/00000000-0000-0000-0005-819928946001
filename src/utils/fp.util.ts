import * as E from "fp-ts/lib/Either";
import { type Validation, type Errors, type Type } from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";

/**
 * Default error message mapper uses PathReporter
 * from 'io-ts'
 */
export const toPathReportErrorMessage = (r: Validation<any>): string => {
  return PathReporter.report(r).join("\n");
};

/**
 * Decode the input with the given codec,
 * and throw an error when the result
 * is `E.Left` (an array of errors).
 *
 * It accepts a `toError` function to create
 * a custom error message from the errors,
 *  if any
 *
 */
export const decodeOrThrow =
  <A, O, I>(codec: Type<A, O, I>, toError?: (e: Errors) => string) =>
  (input: I): A => {
    const result = codec.decode(input);
    if (E.isLeft(result)) {
      if (toError != null) {
        throw new Error(toError(result.left));
      }
      throw new Error(toPathReportErrorMessage(result));
    }
    return result.right;
  };
