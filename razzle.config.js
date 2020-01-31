//@ts-check
"use strict";

const LoadablePlugin = require("@loadable/webpack-plugin").default;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

/** @type {import("./src/@types/razzle").RazzleConfig} */
const config = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
        forkTsChecker: {
          tslint: false,
          eslint: true
        }
      }
    }
  ],
  modify(defaultConfig, { target, dev }) {
    const config = { ...defaultConfig };

    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    });

    if (target === "web") {
      config.plugins.push(
        new LoadablePlugin({
          filename: "../loadable-stats.json",
          writeToDisk: true
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "../report.html",
          openAnalyzer: false
        })
      );
      config.output.filename = dev ? "static/js/[name].js" : "static/js/[name].[contentHash:8].js";
      config.optimization = { ...config.optimization, splitChunks: { chunks: "all" }, runtimeChunk: true };
    }

    return config;
  }
};

module.exports = config;
