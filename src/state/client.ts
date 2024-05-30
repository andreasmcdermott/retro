import type { WriteTransaction } from "@rocicorp/reflect";
import { Entity, generate } from "@rocicorp/rails";

export type ClientState = Entity & { userId: string };

const {
  init: initImpl,
  get: getClientState,
  put: putClientState,
  update: updateClientState,
} = generate<ClientState>("client");

export { getClientState, putClientState, updateClientState };

export function initClientState(tx: WriteTransaction, userId: string) {
  return initImpl(tx, { id: tx.clientID, userId });
}
