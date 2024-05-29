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
  return tx.set("boardState", {
    boardInfo: { name: "New Board", owner: userId, mode: "editing" },
  });
}

export async function getBoardInfo(tx: ReadTransaction) {
  return (await tx.get<BoardState>("boardState"))?.boardInfo ?? null;
}

export async function updateBoardName(
  tx: WriteTransaction,
  { userId, name }: { userId: string; name: string }
) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo && boardInfo.owner === userId)
    return tx.set("boardState", { boardInfo: { ...boardInfo, name } });
}

export async function cycleBoardMode(tx: WriteTransaction, userId: string) {
  const boardInfo = await getBoardInfo(tx);
  if (boardInfo && boardInfo.owner === userId) {
    return tx.set("boardState", {
      boardInfo: {
        ...boardInfo,
        mode:
          boardInfo.mode === "editing"
            ? "voting"
            : boardInfo.mode === "voting"
            ? "viewing"
            : "editing",
      },
    });
  }
}
