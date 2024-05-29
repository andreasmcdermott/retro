// This file defines our "subscriptions". Subscriptions are how Reflect
// notifies you when data has changed. Subscriptions fire whenever the watched
// data changes, whether because the local client changed it, or because some
// other collaborating client changed it. The model is that you render your app
// reactively based on these subscriptions. This guarantees the UI always
// consistently shows the latest data.
//
// Subscriptions can be arbitrary computations of the data in Reflect. The
// subscription "query" is re-run whenever any of the data it depends on
// changes. The subscription "fires" when the result of the query changes.

import { usePresence, useSubscribe } from "@rocicorp/reflect/react";
import { ClientState, getClientState } from "../state/client-state";
import { r } from "../state/r";

export function useCurrentClient() {
  return useSubscribe(r, (tx) => getClientState(tx, r.clientID), null);
}

export function useClients() {
  const clientIds = usePresence(r);

  return useSubscribe(
    r,
    async (tx) => {
      const all: ClientState[] = [];

      for (const id of clientIds) {
        const client = await getClientState(tx, id);
        if (client) all.push(client);
      }

      return all;
    },
    [],
    [clientIds]
  );
}
