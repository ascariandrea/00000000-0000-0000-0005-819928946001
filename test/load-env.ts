import * as path from "path";
import * as dotenv from "dotenv";

export function loadEnv(): void {
  const DOTENV_CONFIG_PATH = path.resolve(
    process.cwd(),
    process.env.DOTENV_CONFIG ?? ".env.test"
  );
  dotenv.config({
    path: DOTENV_CONFIG_PATH,
  });
}
