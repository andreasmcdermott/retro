import ReactDOM from "react-dom/client";

import { App } from "./App";
import { StrictMode } from "react";
import { r } from "./state/r";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("root element is null");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    await r.close();
    root.unmount();
  });
}
