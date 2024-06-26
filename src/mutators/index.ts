import type { MutatorDefs } from "@rocicorp/reflect";
import { initClientState } from "../state/client.js";
import { initUserState, putUserState, updateUserState } from "../state/user.js";
import {
  initBoardState,
  updateBoardName,
  setBoardMode,
} from "../state/board.js";
import {
  putRetroItem,
  deleteRetroItem,
  voteOnRetroItem,
  updateRetroValue,
} from "../state/retro-item.js";

export type M = typeof mutators;

export const mutators = {
  initClientState,
  initUserState,
  putUserState,
  updateUserState,
  initBoardState,
  updateBoardName,
  setBoardMode,
  putRetroItem,
  updateRetroValue,
  deleteRetroItem,
  voteOnRetroItem,
} satisfies MutatorDefs;
