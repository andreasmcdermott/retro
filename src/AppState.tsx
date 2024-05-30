import { createContext, useContext, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { Reflect } from "@rocicorp/reflect/client";
import { mutators } from "./mutators";
import { useAsyncEffect } from "./hooks/useAsyncEffect";
import { getNewUserInfo, hasUserState } from "./state/user";
import { hasBoardState } from "./state/board";

const version = 2;

const Context = createContext<ReturnType<typeof createState> | null>(null);

const createState = () => {
  const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
  if (!server) throw new Error("VITE_REFLECT_URL required");

  const existingUserId = localStorage.getItem(`v${version}:userId`);
  const userId = existingUserId || nanoid();
  localStorage.setItem(`v${version}:userId`, userId);

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

type NewState = ReturnType<typeof createState>;

export function AppState({ children }: { children: React.ReactNode }) {
  const [r, setR] = useState<NewState["r"] | null>(null);
  const [userId, setUserId] = useState<NewState["userId"] | null>(null);
  const [boardId, setBoardId] = useState<NewState["boardId"] | null>(null);

  useAsyncEffect(async () => {
    const newState = createState();
    (window as any).r = newState.r; // Only for HMR

    const promises = [];

    if (!(await newState.r.query((tx) => hasUserState(tx, newState.userId)))) {
      promises.push(
        newState.r.mutate.initUserState({
          id: newState.userId,
          ...getNewUserInfo(),
        })
      );
    }

    if (!(await newState.r.query((tx) => hasBoardState(tx)))) {
      promises.push(newState.r.mutate.initBoardState(newState.userId));
    }

    promises.push(newState.r.mutate.initClientState(newState.userId));

    const result = await Promise.allSettled(promises);

    if (result.some((p) => p.status === "rejected")) {
      console.error("Failed to initialize session");
    }

    setR(newState.r);
    setUserId(newState.userId);
    setBoardId(newState.boardId);
  }, []);

  if (!r || !userId || !boardId) return null;

  return (
    <Context.Provider
      value={useMemo(() => ({ r, userId, boardId }), [r, userId, boardId])}
    >
      <>{children}</>
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
