import { usePresence, useSubscribe } from "@rocicorp/reflect/react";
import { ClientState, getClientState } from "../state/client";
import { getBoardInfo } from "../state/board";
import { listRetroItems, listRetroItemsByColumn } from "../state/retro-item";
import { useReflect } from "../AppState";

export function useCurrentClient() {
  const r = useReflect();
  return useSubscribe(r, (tx) => getClientState(tx, tx.clientID), null);
}

export function useClients() {
  const r = useReflect();
  const clientIds = usePresence(r);

  return useSubscribe(
    r,
    async (tx) => {
      const clients = await Promise.allSettled(
        clientIds.map((id) => getClientState(tx, id))
      );

      const all = clients
        .map((maybeClient) =>
          maybeClient.status === "fulfilled" ? maybeClient.value : null
        )
        .filter((maybeClient): maybeClient is ClientState => !!maybeClient);

      const uniqueUserIds = new Set();
      const finalList = [];

      for (const client of all) {
        if (!uniqueUserIds.has(client.userId)) {
          uniqueUserIds.add(client.userId);
          finalList.push(client);
        }
      }

      return finalList;
    },
    [],
    [clientIds]
  );
}

export function useBoardInfo() {
  const r = useReflect();
  return useSubscribe(r, (tx) => getBoardInfo(tx), {
    name: "Unnamed Board",
    owner: null,
    mode: "viewing",
  });
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
