import { App } from "./App";
import { LandingPage } from "./LandingPage";
import { NotFound, Route, Router } from "./components/Router";

export function Site() {
  return (
    <Router>
      <Route path="/">
        <LandingPage />
      </Route>
      <Route path="/b">
        <App />
      </Route>
      <Route path="/b/:boardId">
        <App />
      </Route>
      <NotFound />
    </Router>
  );
}
