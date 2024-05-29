import { useEffect } from "react";

export function useAsyncEffect(fn: () => Promise<void>, deps: unknown[]) {
  useEffect(() => {
    fn();
  }, deps);
}
