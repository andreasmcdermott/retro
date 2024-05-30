import { usePresence, useSubscribe } from "@rocicorp/reflect/react";
import { getClientState } from "../state/client";
import { getBoardInfo } from "../state/board";
import { listRetroItems, listRetroItemsByColumn } from "../state/retro-item";
import { useReflect, useUserId } from "../AppState";
import { UserState, getUserState } from "../state/user";

export function useCurrentUser() {
  const r = useReflect();
  const userId = useUserId();

  return useSubscribe(r, async (tx) => getUserState(tx, userId), null);
}

export function useUsers() {
  const r = useReflect();
  const clientIds = usePresence(r);

  return useSubscribe(
    r,
    async (tx) => {
      const users = await Promise.allSettled(
        clientIds.map(async (id) => {
          const clientState = await getClientState(tx, id);
          if (!clientState) return null;
          return getUserState(tx, clientState.userId);
        })
      );

      const all = users
        .map((maybeUser) =>
          maybeUser.status === "fulfilled" ? maybeUser.value : null
        )
        .filter((maybeUser): maybeUser is UserState => !!maybeUser);

      const uniqueUserIds = new Set();
      const finalList = [];

      for (const user of all) {
        if (!uniqueUserIds.has(user.id)) {
          uniqueUserIds.add(user.id);
          finalList.push(user);
        }
      }

      return finalList;
    },
    [],
    [clientIds]
  );
}

export function useUser(id: string) {
  const r = useReflect();
  return useSubscribe(r, async (tx) => getUserState(tx, id), null, [id]);
}

export function useBoardInfo() {
  const r = useReflect();
  return useSubscribe(r, (tx) => getBoardInfo(tx), null);
}

export function useRetroItemsByColumn(column: string) {
  const r = useReflect();

  return useSubscribe(
    r,
    (tx) => listRetroItemsByColumn(tx, column),
    [],
    [column]
  );
}

export function useRetroItems() {
  const r = useReflect();
  return useSubscribe(r, (tx) => listRetroItems(tx), []);
}
