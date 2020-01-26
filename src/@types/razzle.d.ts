import Webpack, { Configuration } from "webpack";

type Plugin =
  | string
  | {
      name: string;
      options: unknown;
    };

interface Env {
  target: "web" | "server";
  dev: boolean;
}

declare interface RazzleConfig {
  plugins: Plugin[];
  modify: (defaultConfig: Configuration, env: Env, webpack: typeof Webpack) => Configuration;
}
