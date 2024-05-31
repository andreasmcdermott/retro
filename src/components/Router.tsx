import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type CurrentRouteState = {
  current: string | null;
  params: Record<string, string> | null;
};

type RouteListeners = {
  registerRoute: (route: string) => () => void;
};

type RouteState = CurrentRouteState & RouteListeners;

const RouteContext = createContext<RouteState | null>(null);

export function Router({ children }: { children: React.ReactNode }) {
  const [{ current, params }, setCurrent] = useState<CurrentRouteState>({
    current: null,
    params: null,
  });
  const routesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const origPushState = history.pushState;
    const origReplaceState = history.replaceState;

    const onRouteChange = () => {
      const paths = Array.from(routesRef.current);

      const current = paths.find((path) => {
        const re = new RegExp(
          `^${path
            .replaceAll("/", "\\/")
            .replaceAll(
              /:\w+/g,
              (m) => `(?<${m.slice(1)}>[a-zA-Z0-9-_]+)`
            )}\\/?$`
        );

        if (!re.test(location.pathname)) return false;

        re.lastIndex = 0;
        const groups = re.exec(window.location.pathname)?.groups ?? null;
        setCurrent({ current: path, params: groups });

        return true;
      });

      if (!current) setCurrent({ current: null, params: null });
    };

    history.pushState = function pushState(...args) {
      origPushState.apply(history, args);
      window.dispatchEvent(new Event("routechange"));
      onRouteChange();
    };

    history.replaceState = function replaceState(...args) {
      origReplaceState.apply(history, args);
      window.dispatchEvent(new Event("routechange"));
      onRouteChange();
    };

    window.addEventListener("popstate", () => {
      window.dispatchEvent(new Event("routechange"));
      onRouteChange();
    });

    document.addEventListener("click", (e) => {
      if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey || e.button !== 0)
        return;

      const target = e.target as HTMLElement;
      if (target.hasAttribute("href")) {
        const href = target.getAttribute("href") || "";

        if (
          !URL.canParse(href) ||
          new URL(href).origin === window.location.origin
        ) {
          e.preventDefault();
          history.pushState({}, "", href);
        }
      }
    });

    onRouteChange();
  }, []);

  const registerRoute = useCallback((route: string) => {
    routesRef.current.add(route);
    return () => {
      routesRef.current.delete(route);
    };
  }, []);

  return (
    <RouteContext.Provider value={{ current, params, registerRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

const useRouteContext = () => {
  const data = useContext(RouteContext);
  if (!data) throw new Error("RouteContext not found");
  return data;
};

const useCurrentRoute = () => {
  const { current } = useRouteContext();
  return current;
};

export const useParams = () => useRouteContext().params ?? {};

const useRoute = (path: string) => {
  const { registerRoute, current } = useRouteContext();

  useEffect(() => {
    return registerRoute(path);
  }, [path, registerRoute]);

  return current === path;
};

export function Route({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const isCurrent = useRoute(path);

  if (!isCurrent) return null;

  return <>{children}</>;
}

export function NotFound() {
  const current = useCurrentRoute();
  if (current) return null;
  return <div>404</div>;
}
