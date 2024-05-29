import type { MutatorDefs, WriteTransaction } from "@rocicorp/reflect";
import { initClientState, updateClientState } from "../state/client-state.js";

export type M = typeof mutators;

export const mutators = {
  initClientState,
} satisfies MutatorDefs;
