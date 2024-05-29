import { createContext, useContext, useMemo, useState } from "react";
import { getUserInfo } from "./state/client";
import { nanoid } from "nanoid";
import { Reflect } from "@rocicorp/reflect/client";
import { mutators } from "./mutators";
import { useAsyncEffect } from "./hooks/useAsyncEffect";

const Context = createContext<ReturnType<typeof createState> | null>(null);

const createState = () => {
  const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
  if (!server) throw new Error("VITE_REFLECT_URL required");

  const userId = localStorage.getItem("userId") ?? nanoid();
  localStorage.setItem("userId", userId);

  const pathname = location.pathname.slice(1);
  const boardId = pathname || nanoid();

  if (!pathname) history.replaceState({}, "", `/${boardId}`);

  const r = new Reflect({
    server,
    userID: userId,
    roomID: boardId,
    auth: userId,
    mutators,
  });

  return { r, userId, boardId };
};

export function AppState({ children }: { children: React.ReactNode }) {
  const [r, setR] = useState<ReturnType<typeof createState>["r"] | null>(null);
  const [userId, setUserId] = useState<
    ReturnType<typeof createState>["userId"] | null
  >(null);
  const [boardId, setBoardId] = useState<
    ReturnType<typeof createState>["boardId"] | null
  >(null);

  useAsyncEffect(async () => {
    const { r, userId, boardId } = createState();
    (window as any).r = r; // Only for HMR

    await r.mutate.initClientState({ userId, userInfo: getUserInfo() });
    await r.mutate.initBoardState(userId);

    setR(r);
    setUserId(userId);
    setBoardId(boardId);
  }, []);
  return (
    <Context.Provider
      value={useMemo(
        () => (r && userId && boardId ? { r, userId, boardId } : null),
        [r, userId, boardId]
      )}
    >
      {r && userId && boardId ? <>{children}</> : null}
    </Context.Provider>
  );
}

const useContextState = () => {
  const data = useContext(Context);
  if (!data) throw new Error("AppState not found");
  return data;
};

export const useReflect = () => useContextState().r;
export const useUserId = () => useContextState().userId;
export const useBoardId = () => useContextState().boardId;
