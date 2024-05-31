import { App } from "./App";
import { LandingPage } from "./LandingPage";
import { NotFound, Route, Router } from "./components/Router";

const appUrls = ["/b", "/b/:boardId", "/:boardId"];

export function Site() {
  return (
    <Router>
      <Route path="/">
        <LandingPage />
      </Route>
      <Route path={appUrls}>
        <App />
      </Route>
      <NotFound />
    </Router>
  );
}
