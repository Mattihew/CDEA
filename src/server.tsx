import { readFileSync } from "fs";
import { ChunkExtractor, ChunkExtractorOptions } from "@loadable/server";
import { ServerStyleSheets } from "@material-ui/styles";
import express from "express";
import React from "react";
import { renderToStaticNodeStream, renderToString } from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import Document from "./Document";
import { TitleContext } from "./components/util/Title";

const stats = JSON.parse(readFileSync("./build/loadable-stats.json", { encoding: "UTF-8" }));
const chunkOptions: ChunkExtractorOptions = { stats, entrypoints: "client" };
const extractor = new ChunkExtractor(chunkOptions);
const shell =
  "<!DOCTYPE html>\n" +
  renderToString(
    <Document
      headElements={[...extractor.getLinkElements(), ...extractor.getScriptElements(), ...extractor.getStyleElements()]}
    />
  );

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/shell", (req, res) => {
    res.end(shell);
  })
  .get("/*", (req, res) => {
    let title: string | undefined;
    const setTitle = (t: string): void => {
      title = t;
    };
    const extractor = new ChunkExtractor(chunkOptions);
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
      const url = new URL(context.url, "http://localhost");
      if (context.url === "/login") {
        url.searchParams.set("referrer", req.url);
      }
      res.redirect(url.pathname + url.search);
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
