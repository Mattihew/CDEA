import { loadableReady } from "@loadable/component";
import React from "react";
import { hydrate, render, Renderer } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const root = document.getElementById("root");

const rendererFunc = (renderer: Renderer) => () => {
  renderer(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root,
    () => {
      const jssStyles = document.getElementById("jss-server-side");
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  );
};

if (root?.innerHTML !== "") {
  loadableReady(rendererFunc(hydrate));
} else {
  rendererFunc(render)();
}

if (module.hot) {
  module.hot.accept();
}
