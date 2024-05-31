import ReactDOM from "react-dom/client";

import { StrictMode } from "react";
import { Site } from "./Site";

const rootElement = document.getElementById("root");
if (rootElement === null) throw new Error("root element is null");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <StrictMode>
    <Site />
  </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.dispose(async () => {
    await (window as any).r.close();
    root.unmount();
  });
}
