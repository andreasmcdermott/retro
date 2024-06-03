import { createContext, useContext, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { Reflect } from "@rocicorp/reflect/client";
import { mutators } from "./mutators";
import { useAsyncEffect } from "./hooks/useAsyncEffect";
import { getNewUserInfo } from "./state/user";
import { gotoBoard, setLastBoardId } from "./utils/board";

const version = 2;

const createState = (boardId: string) => {
  const server: string | undefined = import.meta.env.VITE_REFLECT_URL;
  if (!server) throw new Error("VITE_REFLECT_URL required");

  const existingUserId = localStorage.getItem(`v${version}:userId`);
  const userId = existingUserId || nanoid();
  localStorage.setItem(`v${version}:userId`, userId);

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

const Context = createContext<NewState | null>(null);

export function AppState({
  boardId: _boardId,
  children,
}: {
  boardId: string | null | undefined;
  children: React.ReactNode;
}) {
  const [r, setR] = useState<NewState["r"] | null>(null);
  const [userId, setUserId] = useState<NewState["userId"] | null>(null);
  const [boardId, setBoardId] = useState<NewState["boardId"] | null>(null);

  useAsyncEffect(async () => {
    const newBoard = !_boardId;
    const newState = createState(_boardId || nanoid());
    (window as any).r = newState.r; // Only for HMR

    gotoBoard(newState.boardId, true);
    setLastBoardId(newState.boardId);

    await newState.r.mutate.initUserState({
      id: newState.userId,
      ...getNewUserInfo(),
    });
    await newState.r.mutate.initClientState(newState.userId);

    if (newBoard) await newState.r.mutate.initBoardState(newState.userId);

    setR(newState.r);
    setUserId(newState.userId);
    setBoardId(newState.boardId);
  }, [_boardId]);

  const state = useMemo(
    () => (r && userId && boardId ? { r, userId, boardId } : null),
    [r, userId, boardId]
  );

  if (!r || !userId || !boardId) return null;

  return (
    <Context.Provider value={state}>
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
