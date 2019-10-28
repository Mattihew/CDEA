import { ChunkExtractor } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/styles";
import express from "express";
import { resolve } from "path";
import React from "react";
import { renderToStaticNodeStream, renderToString } from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import Document from "./Document";
import { TitleContext } from "./components/util/Title";

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req, res) => {
    let title: string | undefined;
    const setTitle = (t: string): void => {
      title = t;
    };
    const statsFile = resolve("./build/loadable-stats.json");
    const extractor = new ChunkExtractor({ statsFile, entrypoints: "client" });
    const sheets = new ServerStyleSheets();
    const context: StaticRouterContext = {};
    const html = renderToString(
      extractor.collectChunks(
        sheets.collect(
          <TitleContext.Provider value={setTitle}>
            <StaticRouter context={context} location={req.url}>
              <App />
            </StaticRouter>
          </TitleContext.Provider>
        )
      )
    );

    if (context.statusCode) {
      res.status(context.statusCode);
    }
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.write("<!DOCTYPE html>");
      renderToStaticNodeStream(
        <Document
          title={title}
          headElements={[
            ...extractor.getLinkElements(),
            ...extractor.getScriptElements(),
            ...extractor.getStyleElements(),
            sheets.getStyleElement()
          ]}
        >
          {html}
        </Document>
      ).pipe(res);
    }
  });

export default server;
