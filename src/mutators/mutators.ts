import type { MutatorDefs } from "@rocicorp/reflect";
import { initClientState } from "../state/client.js";
import { setBoardInfo } from "../state/board.js";
import {
  putRetroItem,
  updateRetroItem,
  deleteRetroItem,
  voteOnRetroItem,
} from "../state/retro-item.js";

export type M = typeof mutators;

export const mutators = {
  initClientState,
  setBoardInfo,
  putRetroItem,
  updateRetroItem,
  deleteRetroItem,
  voteOnRetroItem,
} satisfies MutatorDefs;
