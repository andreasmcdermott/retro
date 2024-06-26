import type { ReadTransaction, WriteTransaction } from "@rocicorp/reflect";

export type BoardInfo = {
  name: string;
  owner: string;
  mode: "editing" | "voting" | "viewing";
};
export type BoardState = {
  boardInfo: BoardInfo;
};

export async function initBoardState(tx: WriteTransaction, userId: string) {
  return tx.set("board", {
    boardInfo: { name: "Unnamed Board", owner: userId, mode: "editing" },
  });
}

export async function getBoardInfo(tx: ReadTransaction) {
  return (await tx.get<BoardState>("board"))?.boardInfo ?? null;
}

export async function updateBoardName(
  tx: WriteTransaction,
  { userId, name }: { userId: string; name: string }
) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo && boardInfo.owner === userId)
    return tx.set("board", { boardInfo: { ...boardInfo, name } });
}

export async function setBoardMode(
  tx: WriteTransaction,
  { userId, mode }: { mode: "editing" | "viewing" | "voting"; userId: string }
) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo && boardInfo.owner === userId)
    return tx.set("board", { boardInfo: { ...boardInfo, mode } });
}
