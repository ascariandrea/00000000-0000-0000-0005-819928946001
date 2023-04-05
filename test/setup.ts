import { loadEnv } from "./load-env";

export async function mochaGlobalSetup(): Promise<void> {
  loadEnv();
}
