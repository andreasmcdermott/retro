import type { MutatorDefs } from "@rocicorp/reflect";
import { initClientState, setUserInfo } from "../state/client.js";
import {
  initBoardState,
  updateBoardName,
  cycleBoardMode,
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
  setUserInfo,
  initBoardState,
  updateBoardName,
  cycleBoardMode,
  putRetroItem,
  updateRetroValue,
  deleteRetroItem,
  voteOnRetroItem,
} satisfies MutatorDefs;
